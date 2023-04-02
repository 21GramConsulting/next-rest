import {Identifier} from '#Identifier';
import {UpdateHandler} from '#handlers/UpdateHandler';
import {Query as QueryOf} from '#Query';
import {Coded} from './Coded';
import {Description} from './Description';
import {IdentityAware} from "./Identified";

/**
 * @summary
 * A description of a resource that can be updated.
 * @template R The type of the resource.
 * @template ID The type of the identifier of the resource.
 * @group Core API
 */
export type Update<R, ID> = Coded<R> & IdentityAware & {
  /**
   * @summary
   * The handler that will be used to update the resource.
   */
  update: UpdateHandler<R, Identifier<ID>>;
};

/**
 * @summary
 * Determines whether a description is an update description.
 * @param v The description to test.
 * @returns `true` if the description is an update description, `false` otherwise.
 * @template R The type of the resource.
 * @template I The type of the identifier of the resource.
 * @template Q The type of the query of the resource.
 */
export const isUpdatable = <R, I, Q extends QueryOf<R>>(
  v: Description<R, I, Q>
): v is Update<R, I> => {
  const candidate = v as Update<R, I>;
  if (typeof candidate.idParameterName !== 'string')
    return false;
  return typeof candidate.update === 'function';
};
