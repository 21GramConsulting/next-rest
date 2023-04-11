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
  Query = never
> = {
  endpoint: string;
  codec: Codec<Resource>;
  requestInit?: RequestInit;
} & (Queryable<Query> | {});

/**
 * @summary
 * A convenience function for creating a client descriptor.
 * @description
 * This function is useful for creating a client descriptor in a type-safe manner.
 * It helps you avoid the need to explicitly type the descriptor, which is admittedly a bit verbose.
 * @param descriptor - The descriptor to create.
 * @returns The descriptor, unaltered.
 */
export const clientDescriptor = <
  ID extends string,
  Resource extends Identifiable<ID>,
  Query = never
>(
  descriptor: ClientDescriptor<ID, Resource, Query>
): ClientDescriptor<ID, Resource, Query> => descriptor;

export type Queryable<Query> = {query: RecordShape<Query>};

export const isQueryable = <Query>(value: any): value is Queryable<Query> => {
  if (typeof value !== 'object' || value === null) return false;
  return Object.keys(value).every(key => isCodec(value[key]));
};
