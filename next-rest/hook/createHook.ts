import {UseHook} from '#hook/UseHook';
import {Identifiable} from '#Identifiable';
import {Hook} from '#hook/Hook';
import useSWR, {SWRConfiguration} from 'swr';
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
  const write = createInsertion(descriptor);
  const remove = createDeletion(descriptor);
  const retrieval = createRetrieval(descriptor);

  function useHook(id: ID, conf?: SWRConfiguration): Hook<ID, Resource>;
  function useHook(q?: Query, conf?: SWRConfiguration): Hook<ID, Set<Resource>>;
  function useHook(key: any, conf?: SWRConfiguration): any {
    const {data, error, isValidating} = useSWR(key, retrieval, conf);
    const output = isValidating ? undefined : error ?? data ?? null;
    return [output, write, remove];
  }

  return useHook;
}
