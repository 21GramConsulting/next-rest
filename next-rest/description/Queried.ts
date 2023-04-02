import {Codec} from '@21gram-consulting/ts-codec';
import {Query as QueryOf} from '#Query';

/**
 * @summary
 * A description of a resource handler that can be queried.
 * @description
 * Used for `ReadSet` mostly but not exclusively.
 * Apply this type if for whatever reason you would want to
 * support Query parameters for a non-`ReadSet` handler.
 * @template R The type of the resource.
 * @template Q The type of the resource's query.
 * @see ReadSet
 * @group Core API
 */
export type Queried<R, Q extends QueryOf<R>> = {
  /**
   * @summary
   * The codec used to encode and decode the query.
   */
  queryCodec: Codec<Q>;
};
