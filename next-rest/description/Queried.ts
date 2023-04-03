import {RecordShape} from '@21gram-consulting/ts-codec';

/**
 * @summary
 * A description of a resource handler that can be queried.
 * @description
 * Used for `ReadSet` mostly but not exclusively.
 * Apply this type if for whatever reason you would want to
 * support Query parameters for a non-`ReadSet` handler.
 * @template Q The type of the resource's query.
 * @see ReadSet
 * @group Core API
 */
export type Queried<Q> = {
  /**
   * @summary
   * The query shape to use for for coding.
   * @description
   * This query shape will be wrapped in a `Codec` and used
   * to encode & decode query parameters.
   */
  query: RecordShape<Q>;
};
