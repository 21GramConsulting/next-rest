import {urlSearchParams, json} from '@21gram-consulting/ts-codec';
import {UseHook} from '#hook/UseHook';
import {Identifiable, Identified, isUnidentified} from '#Identifiable';
import {isId, isQueryDefined} from '#Selection';
import {Hook} from '#hook/Hook';
import useSWR, {SWRConfiguration} from 'swr';
import fetch from '#fetch';
import {ClientDescriptor} from '#ClientDescriptor';
import createDeletion from '#clientAction/remove';

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
        return fetch(descriptor.endpoint, {
          ...payload,
          ...descriptor.requestInit,
          method: 'POST',
        })
          .then(r => r.text())
          .then(r => resourceCodec.decode(r));
      }

      const uri = descriptor.endpoint.concat('/').concat(value.id);
      // TODO: revisit for a slightly more elegant solution.
      // This forced typecast at the time of writing is 100% safe.
      // TODO: SECOND TODO; This branching was/is for PUT, UPDATE, POST calls. Will revisit in OSS.
      // const freshData = (await outputReader(uri)) as Resource | undefined;
      // if (!freshData) {
      //   return fetch(endpoint, {...payload, ...descriptor.requestInit, method: 'POST'}).then(r =>
      //     resourceCodec.decode(r)
      //   );
      // }

      return fetch(uri, {...payload, ...descriptor.requestInit, method: 'PUT'})
        .then(r => r.text())
        .then(r => resourceCodec.decode(r));
    }

    const remove = createDeletion(descriptor);

    return [output, write, remove];
  }

  return useHook;
}
