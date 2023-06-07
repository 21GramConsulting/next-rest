import {Description} from '#description';

/**
 * @summary
 * Describes an identified resource.
 * @description
 * Used for `Read` and `Delete` mostly but not exclusively.
 * Apply this type for cases where you would want to support
 * an identifier parameter.
 * @group Core API
 */
export type IdentityAware = {
  /**
   * @summary
   * The name of the identifier parameter.
   * @description
   * This is the name of the parameter that will be used to
   * extract the resource's identifier from the NextJS request.
   */
  idParameterName: string;
};

/**
 * @summary
 * Determines if a description is identity aware.
 * @param v The description to test.
 * @returns True if the description is identity aware, false otherwise.
 * @template R The type of the resource.
 * @template I The type of the identifier.
 * @template Q The type of the query.
 * @group Core API
 */
export const isIdentityAware = <R, I, Q>(
  v: Description<R, I, Q>
): v is IdentityAware & Description<R, I, Q> => {
  const candidate = v as IdentityAware;
  return typeof candidate.idParameterName === 'string';
};
