/**
 * @summary
 * Describes an identified resource.
 * @description
 * Used for `Read` and `Delete` mostly but not exclusively.
 * Apply this type for cases where you would want to support
 * an identifier parameter.
 * @group Core API
 */
export type Identified = {
  /**
   * @summary
   * The name of the identifier parameter.
   * @description
   * This is the name of the parameter that will be used to
   * extract the resource's identifier from the NextJS request.
   */
  idParameterName: string;
};
