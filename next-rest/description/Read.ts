import {ReadHandler} from '#handlers/ReadHandler';
import {Identifier} from '#Identifier';
import {Coded} from './Coded';
import {Description} from './Description';
import {IdentityAware} from './Identified';

/**
 * @summary
 * A description of a resource that can be read.
 * @description
 * Used to identify and describe a resource that can be read.
 * Responsible for singular reads.
 * @template R The type of the resource.
 * @template ID The type of the identifier.
 * @see ReadSet
 * @group Core API
 */
export type Read<R, ID> = Coded<R> &
  IdentityAware & {
    /**
     * @summary
     * The handler that will be used to read the resource.
     */
    read: ReadHandler<R, Identifier<ID>>;
  };

/**
 * @summary
 * Determines if a description is a read description.
 * @param v The description to test.
 * @returns True if the description is a read description, false otherwise.
 * @template R The type of the resource.
 * @template I The type of the identifier.
 * @template Q The type of the query.
 */
export const isReadable = <R, I, Q>(
  v: Description<R, I, Q>
): v is Read<R, I> => {
  const candidate = v as Read<R, I>;
  if (typeof candidate.idParameterName !== 'string') return false;
  return typeof candidate.read === 'function';
};
