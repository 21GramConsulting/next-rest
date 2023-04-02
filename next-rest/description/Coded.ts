import {Codec} from '@21gram-consulting/ts-codec';

/**
 * @summary
 * Provides the binding of a codec to a `next-rest` resource
 * descriptor.
 * @description
 * This type is used to provide the binding of a codec to a
 * `next-rest` resource descriptor.
 *
 * This level of type granularity allows you to build both
 * robust and flexible APIs.
 *
 * @template R The type of the resource.
 * @see {@link https://github.com/21GramConsulting/ts-codec | Codec}
 * @group Core API
 */
export type Coded<R> = {
  /**
   * @summary
   * The codec used to encode and decode the resource.
   */
  codec: Codec<R>;
};
