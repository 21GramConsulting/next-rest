import {ReadHandler} from '#handlers/ReadHandler';
import {Query as QueryOf} from '#Query';
import {Coded} from './Coded';
import {Description} from './Description';
import {Queried} from './Queried';

/**
 * @summary
 * A description of a resource that can be read in sets.
 * @description
 * Used to identify and describe a resource that can be read
 * in sets.
 * Responsible for plural reads.
 * @template R The type of the resource.
 * @template Q The type of the resource's query.
 * @see Read
 * @group Core API
 */
export type ReadSet<R, Q extends QueryOf<R>> = Coded<R> &
  Queried<R, Q> & {
    /**
     * @summary
     * The handler used to read the resource in sets.
     */
    readSet: ReadHandler<Set<R>, Q>;
  };

/**
 * @summary
 * Determines if a description is a read set description.
 * @param v The description to test.
 * @returns True if the description is a read set description.
 * @template R The type of the resource.
 * @template I The type of the id.
 * @template Q The type of the query.
 */
export const isReadSetable = <R, I, Q extends QueryOf<R>>(
  v: Description<R, I, Q>
): v is ReadSet<R, Q> => {
  const candidate = v as ReadSet<R, Q>;
  if (typeof candidate.queryCodec !== 'object') return false;
  return typeof candidate.readSet === 'function';
};
