import {Query as QueryOf} from '#Query';
import {CreateHandler} from '#handlers/CreateHandler';
import {Coded} from './Coded';
import {Description} from './Description';

/**
 * @summary
 * A description of a resource that can be created.
 * @description
 * Used to identify and indicate a resource's support for
 * create calls.
 * @template R The type of the resource.
 * @group Core API
 */
export type Create<R> = Coded<R> & {
  /**
   * @summary
   * The handler used to create a resource.
   */
  create: CreateHandler<R>;
};

/**
 * @summary
 * Determines if a description is a create description.
 * @param v The description to test.
 * @returns True if the description is a create description.
 * @template R The type of the resource.
 */
export const isCreatable = <R, I, Q extends QueryOf<R>>(
  v: Description<R, I, Q>
): v is Create<R> => {
  const candidate = v as Create<R>;
  return typeof candidate.create === 'function';
};
