import {
  Codec,
  RecordShape,
  urlSearchParams,
  json,
} from '@21gram-consulting/ts-codec';
import {UseHook} from '#hook/UseHook';
import {Identifiable, Identified, isUnidentified} from '#Identifiable';
import {isId, isQueryDefined, isSelection} from '#hook/Selection';
import {Hook} from '#hook/Hook';
import useSWR, {SWRConfiguration} from 'swr';
import fetch from '#fetch';

export function createHook<
  ID extends string,
  Resource extends Identifiable<ID>,
  Query
>(
  endpoint: string,
  codec: Codec<Resource>,
  query: RecordShape<Query>
): UseHook<ID, Resource, Query> {
  const queryCodec = urlSearchParams(query);
  const resourceCodec = json.optional(codec);
  const resourceSetCodec = json.set(codec);

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
      ? endpoint.concat('/').concat(selection)
      : isQueryDefined(selection)
      ? endpoint.concat('?').concat(queryCodec.encode(selection))
      : undefined;

    const outputReader = (uri: string) =>
      fetch(uri)
        .then(r => r.text())
        .then(r =>
          isSelection(selection)
            ? resourceSetCodec.decode(r)
            : resourceCodec.decode(r)
        );

    const {data, error, isValidating} = useSWR(key, outputReader, swrConfig);

    const output = isValidating ? undefined : error ?? data ?? null;

    async function write(value: Resource): Promise<Resource & Identified<ID>>;
    async function write(
      value: Set<Resource>
    ): Promise<Set<Resource & Identified<ID>>>;
    async function write(value: any): Promise<any> {
      if (value instanceof Set)
        return new Set(await Promise.all(Array.from(value).map(write)));

      const payload: RequestInit = {
        body: resourceCodec.encode(value),
      };
      if (isUnidentified<ID>(value)) {
        return fetch(endpoint, {...payload, method: 'POST'})
          .then(r => r.text())
          .then(r => resourceCodec.decode(r));
      }

      const uri = endpoint.concat('/').concat(value.id);
      // TODO: revisit for a slightly more elegant solution.
      // This forced typecast at the time of writing is 100% safe.
      // TODO: SECOND TODO; This branching was/is for PUT, UPDATE, POST calls. Will revisit in OSS.
      // const freshData = (await outputReader(uri)) as Resource | undefined;
      // if (!freshData) {
      //   return fetch(endpoint, {...payload, method: 'POST'}).then(r =>
      //     resourceCodec.decode(r)
      //   );
      // }

      return fetch(uri, {...payload, method: 'PUT'}).then(r =>
        resourceCodec.decode(r)
      );
    }

    async function remove(
      value: (Resource & Identified<ID>) | Set<Resource & Identified<ID>>
    ) {
      if (value instanceof Set) {
        await Promise.all(Array.from(value).map(remove));
        return;
      }

      const uri = endpoint.concat('/').concat(value.id);
      await fetch(uri, {method: 'DELETE'}).then(r => resourceCodec.decode(r));
    }

    return [output, write, remove];
  }

  return useHook;
}
