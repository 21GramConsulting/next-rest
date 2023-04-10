import {urlSearchParams, json} from '@21gram-consulting/ts-codec';
import {UseHook} from '#hook/UseHook';
import {Identifiable} from '#Identifiable';
import {isId, isQueryDefined} from '#Selection';
import {Hook} from '#hook/Hook';
import useSWR, {SWRConfiguration} from 'swr';
import fetch from '#fetch';
import {ClientDescriptor} from '#ClientDescriptor';
import createDeletion from '#clientAction/createDeletion';
import createInsertion from '#clientAction/createInsertion';
import createRetrieval from '#clientAction/createRetrieval';

export function createHook<
  ID extends string,
  Resource extends Identifiable<ID>,
  Query
>(
  descriptor: ClientDescriptor<ID, Resource, Query>
): UseHook<ID, Resource, Query> {
  const queryCodec = urlSearchParams(descriptor.query);
  const resourceCodec = json.optional(descriptor.codec);
  const resourceSetCodec = json.set(descriptor.codec);
  const write = createInsertion(descriptor);
  const remove = createDeletion(descriptor);
  const retrieval = createRetrieval(descriptor);

  function useHook(
    selection: ID,
    swrConf?: SWRConfiguration
  ): Hook<ID, Resource>;
  function useHook(
    selection?: Query,
    swrConf?: SWRConfiguration
  ): Hook<ID, Set<Resource>>;
  function useHook(selection: any, swrConfig?: SWRConfiguration): any {
    const key = isId(selection)
      ? descriptor.endpoint.concat('/').concat(selection)
      : isQueryDefined(selection)
      ? descriptor.endpoint.concat('?').concat(queryCodec.encode(selection))
      : undefined;

    const outputReader = (uri: string) =>
      fetch(uri, descriptor.requestInit)
        .then(r => r.text())
        .then(r =>
          isId(selection) ? resourceCodec.decode(r) : resourceSetCodec.decode(r)
        );

    const {data, error, isValidating} = useSWR(key, outputReader, swrConfig);

    const output = isValidating ? undefined : error ?? data ?? null;

    return [output, write, remove];
  }

  return useHook;
}
