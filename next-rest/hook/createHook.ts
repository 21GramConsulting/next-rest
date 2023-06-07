import {UseHook} from '#hook/UseHook';
import {Identifiable} from '#Identifiable';
import {Hook} from '#hook/Hook';
import useSWR, {SWRConfiguration} from 'swr';
import {ClientDescriptor} from '#ClientDescriptor';
import createDeletion from '#clientAction/createDeletion';
import createInsertion from '#clientAction/createInsertion';
import createRetrieval, {Key} from '#clientAction/createRetrieval';

/**
 * @summary Creates a CRUD hook for a given resource.
 * @description
 * This function creates a CRUD hook for a given resource.
 * The hook is a function that takes a filter and returns a
 * tuple of the resource, a function to write the resource,
 * and a function to delete the resource.
 *
 * @param descriptor - The descriptor of the resource.
 * @returns A CRUD react hook for the resource.
 * @template ID - The type of the resource's id.
 * @template Resource - The type of the resource.
 * @template Query - The type of the query.
 *
 * @example <caption>Basic usage</caption>
 * const useUser = createHook({
 *   endpoint: '/api/user',
 *   codec: userCodec,
 *   query: userQuery
 * });
 * const [user, writeUser, deleteUser] = useUser('1');
 * const [users, writeUsers, deleteUsers] = useUser({name: 'John'});
 * const [user, writeUser, deleteUser] = useUser();
 * const [user, writeUser, deleteUser] = useUser('1', {fallbackData: {name: 'John'}});
 * const [users, writeUsers, deleteUsers] = useUser({name: 'John'}, {fallbackData: [{name: 'John'}]});
 */
export function createHook<
  ID extends string,
  Resource extends Identifiable<ID>,
  Query = never
>(
  descriptor: ClientDescriptor<ID, Resource, Query>
): UseHook<ID, Resource, Query> {
  const write = createInsertion(descriptor);
  const remove = createDeletion(descriptor);
  const retrieval = createRetrieval(descriptor);

  function useHook(
    id: ID | undefined,
    conf?: SWRConfiguration
  ): Hook<ID, Resource>;
  function useHook(
    q?: Query | undefined,
    conf?: SWRConfiguration
  ): Hook<ID, Set<Resource>>;
  function useHook(filter: any, conf?: SWRConfiguration): any {
    const key: Key<ID, Resource, Query> = {descriptor, filter};
    const {data, error, isValidating} = useSWR(
      filter ? key : undefined,
      retrieval,
      conf
    );
    const output = isValidating ? undefined : error ?? data ?? null;
    return [output, write, remove];
  }

  return useHook;
}
