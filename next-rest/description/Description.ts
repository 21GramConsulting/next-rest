import {Codec} from '@21gram-consulting/ts-codec';
import {ReadHandler} from '#handlers/ReadHandler';
import {Identifier} from '#Identifier';
import {UpdateHandler} from '#handlers/UpdateHandler';
import {Query as QueryOf} from '#Query';
import {CreateHandler} from '#handlers/CreateHandler';
import {Coded} from './Coded';

export type Description<Record, ID, Query extends QueryOf<Record>> =
  | Create<Record>
  | ReadSet<Record, Query>
  | Read<Record, ID>
  | Delete<Record, ID>
  | Update<Record, ID>;

export type Create<R> = Coded<R> & {create: CreateHandler<R>};
export type ReadSet<R, Q extends QueryOf<R>> = Coded<R> &
  Queried<R, Q> & {readSet: ReadHandler<Set<R>, Q>};
export type Read<R, ID> = Coded<R> &
  Identified & {read: ReadHandler<R, Identifier<ID>>};
export type Delete<R, ID> = Coded<R> &
  Identified & {delete: ReadHandler<R, Identifier<ID>>};
export type Update<R, ID> = Coded<R> &
  Identified & {update: UpdateHandler<R, Identifier<ID>>};

export type Queried<R, Q extends QueryOf<R>> = {query: Codec<Q>};
export type Identified = {idParameterName: string};

export const isCreatable = <R, I, Q extends QueryOf<R>>(
  v: Description<R, I, Q>
): v is Create<R> => {
  const candidate = v as Create<R>;
  return typeof candidate.create === 'function';
};

export const isReadable = <R, I, Q extends QueryOf<R>>(
  v: Description<R, I, Q>
): v is Read<R, I> => {
  const hypothesis = v as Read<R, I>;
  if (typeof hypothesis.idParameterName !== 'string') return false;
  return typeof hypothesis.read === 'function';
};

export const isReadSetable = <R, I, Q extends QueryOf<R>>(
  v: Description<R, I, Q>
): v is ReadSet<R, Q> => {
  const hypothesis = v as ReadSet<R, Q>;
  if (typeof hypothesis.query !== 'object') return false;
  return typeof hypothesis.readSet === 'function';
};

export const isDeletable = <R, I, Q extends QueryOf<R>>(
  v: Description<R, I, Q>
): v is Delete<R, I> => {
  const hypothesis = v as Delete<R, I>;
  if (typeof hypothesis.idParameterName !== 'string') return false;
  return typeof hypothesis.delete === 'function';
};

export const isUpdateable = <R, I, Q extends QueryOf<R>>(
  v: Description<R, I, Q>
): v is Update<R, I> => {
  const hypothesis = v as Update<R, I>;
  if (typeof hypothesis.idParameterName !== 'string') return false;
  return typeof hypothesis.update === 'function';
};
