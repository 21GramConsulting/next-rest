import Exception from '#Exception';
import {Identifiable, Identified} from '#Identifiable';

export type Processing = undefined;
export const processing = undefined;

export type NoResult = null;
export const noResult = null;

export type Result<R> = R extends Set<
  infer Resource extends Identified<infer ID>
>
  ? Set<Identified<ID> & Resource>
  : R extends Identified<infer ID>
  ? R & Identified<ID>
  : never;
export type SuccessfulRemoval = undefined;

export type Output<R> = Processing | NoResult | Result<R> | Exception;
export type Write<R> = (value: R) => Promise<Result<R>>;
export type Remove<R, ID> = (
  value: R & Identified<ID>
) => Promise<SuccessfulRemoval>;

export type Hook<ID, R> = R extends Set<infer Resource extends Identifiable<ID>>
  ? [
      output: Output<R>,
      write: Write<Resource> & Write<R>,
      remove: Remove<ID, R> & Remove<ID, Resource>
    ]
  : R extends Iterable<infer _Resource>
  ? never
  : R extends Identifiable<ID>
  ? [
      output: Output<R>,
      write: Write<R> & Write<Set<R>>,
      Remove: Remove<R, ID> & Remove<Set<R>, ID>
    ]
  : never;

export const isProcessing = <R, _ID>(v: Output<R>): v is Processing =>
  v === undefined;
export const isNoResult = <R, _ID>(v: Output<R>): v is NoResult => v === null;
export const isException = <R, _ID>(v: Output<R>): v is Exception =>
  v instanceof Exception;
export const isResult = <R, _ID>(v: Output<R>): v is Result<R> =>
  !isProcessing(v) && !isNoResult(v) && !isException(v);
