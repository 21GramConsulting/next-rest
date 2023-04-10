import {Identifiable} from '#Identifiable';
import {Codec, RecordShape} from '@21gram-consulting/ts-codec';

/**
 * @summary
 * A descriptor for a client.
 * @see {@link createConnector}
 * @see {@link createHook}
 */
export type ClientDescriptor<
  ID extends string,
  Resource extends Identifiable<ID>,
  Query
> = {
  endpoint: string;
  codec: Codec<Resource>;
  query: RecordShape<Query>;
  requestInit?: RequestInit;
};
