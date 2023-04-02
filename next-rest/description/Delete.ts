import {ReadHandler} from '#handlers/ReadHandler';
import {Identifier} from '#Identifier';
import {Query as QueryOf} from '#Query';
import {Coded} from './Coded';
import {Description} from './Description';
import {IdentityAware} from "./Identified";

/**
 * @summary
 * A description of a resource that can be deleted.
 * @template R The type of the resource.
 * @template ID The type of the resource's identifier.
 * @group Core API
 */
export type Delete<R, ID> = Coded<R> & IdentityAware & {
  /**
   * @summary
   * The handler that deletes the resource.
   */
  delete: ReadHandler<R, Identifier<ID>>;
};

/**
 * @summary
 * Determines whether a description is a description of a
 * resource that can be deleted.
 * @param v The description to test.
 * @returns `true` if the description is a description of a
 * @template R The type of the resource.
 * @template I The type of the resource's identifier.
 */
export const isDeletable = <R, I, Q extends QueryOf<R>>(
  v: Description<R, I, Q>
): v is Delete<R, I> => {
  const candidate = v as Delete<R, I>;
  if (typeof candidate.idParameterName !== 'string')
    return false;
  return typeof candidate.delete === 'function';
};
