import {Codec} from '@21gram-consulting/ts-codec';

/**
 * @summary
 * Provides the binding of a codec to a `next-rest` resource
 * sdescriptor.
 * @description
 * This type is used to provide the binding of a codec to a
 * `next-rest` resource sdescriptor.
 *
 * This level of type granularity allows you to build both
 * robust and flexible APIs.
 *
 * @template R The type of the resource.
 * @see {@link https://github.com/21GramConsulting/ts-codec | Codec}
 * @group Core API
 */
export type Coded<R> = {codec: Codec<R>};
