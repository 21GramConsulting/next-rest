import {Codec} from '@21gram-consulting/ts-codec';
import {query as queryCodecFactory, Shape as QueryShape} from '#codec/query';
import {UseHook} from '#hook/UseHook';
import {Identifiable, Identified, isUnidentified} from '#Identifiable';
import {Query as QueryOf} from '#Query';
import {
  isId,
  isQueryDefined,
  isSelection,
  Selection as SelectionType,
} from '#hook/Selection';
import {Hook} from '#hook/Hook';
import {___endpoint} from '#___endpoint';
import useSWR from 'swr';
import fetch from '#hook/fetch';
import {json} from '@21gram-consulting/ts-codec';
function createUseHook<
  ID extends string,
  Record extends Identifiable<ID>,
  Query extends QueryOf<Record>,
  Selection extends SelectionType<ID, Record, Query>
>(
  endpoint: string,
  record: Codec<Record>,
  query: QueryShape<Query>
): UseHook<ID, Record, Query, Selection> {
  // @formatter:on
  if (endpoint.startsWith('file://')) endpoint = ___endpoint(endpoint);
  const queryCodec = queryCodecFactory(query);
  const recordCodec = json.optional(record);
  const recordSetCodec = json.set(record);

  function useHook(selection: ID): Hook<ID, Record>;
  function useHook(selection?: Query): Hook<ID, Set<Record>>;
  function useHook(selection: any): any {
    const key = isId(selection)
      ? endpoint.concat('/').concat(selection)
      : isQueryDefined(selection)
        ? endpoint.concat('?').concat(queryCodec.encode(selection))
        : undefined;

    const outputReader = (uri: string) =>
      fetch(uri).then(r =>
        isSelection(selection)
          ? recordSetCodec.decode(r)
          : recordCodec.decode(r)
      );

    // TODO: Call Mutate just in case :) the refresh interval keeps the state fresh but still...
    const {data, error, isValidating, mutate} = useSWR(key, outputReader, {
      // TODO: refresh interval will be fun to tinker with
      refreshInterval: 500,
    });

    // See Hook.ts
    const output = isValidating ? undefined : error ?? data ?? null;

    async function write(value: Record): Promise<Record & Identified<ID>>;
    async function write(
      value: Set<Record>
    ): Promise<Set<Record & Identified<ID>>>;
    async function write(value: any): Promise<any> {
      if (value instanceof Set)
        return new Set(await Promise.all(Array.from(value).map(write)));

      const payload: RequestInit = {
        body: recordCodec.encode(value),
      };
      if (isUnidentified<ID>(value)) {
        return fetch(endpoint, {...payload, method: 'POST'}).then(r =>
          recordCodec.decode(r)
        );
      }

      const uri = endpoint.concat('/').concat(value.id);
      // TODO: revisit for a slightly more elegant solution.
      // This forced typecast at the time of writing is 100% safe.
      const freshData = (await outputReader(uri)) as Record | undefined;
      // you shouldn't pull ids out of your ass but if you do, we support it.
      if (!freshData) {
        return fetch(endpoint, {...payload, method: 'POST'}).then(r =>
          recordCodec.decode(r)
        );
      }

      return fetch(uri, {...payload, method: 'PUT'}).then(r =>
        recordCodec.decode(r)
      );
    }

    async function remove(
      value: (Record & Identified<ID>) | Set<Record & Identified<ID>>
    ) {
      if (value instanceof Set) {
        await Promise.all(Array.from(value).map(remove));
        return;
      }

      const uri = endpoint.concat('/').concat(value.id);
      await fetch(uri, {method: 'DELETE'}).then(r => recordCodec.decode(r));
    }

    return [output, write, remove];
  }

  return useHook;
}

export default createUseHook;
