import {Identifiable} from '#Identifiable';
import {Codec, RecordShape, isCodec} from '@21gram-consulting/ts-codec';

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
  requestInit?: RequestInit;
} & (Queryable<Query> | {});

export type Queryable<Query> = {query: RecordShape<Query>};

export const isQueryable = <Query>(value: any): value is Queryable<Query> => {
  if (typeof value !== 'object' || value === null) return false;
  return Object.keys(value).every(key => isCodec(value[key]));
};
