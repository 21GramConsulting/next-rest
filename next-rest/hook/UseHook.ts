import {Identifiable} from '#Identifiable';
import {Hook} from '#hook/Hook';
import {SWRConfiguration} from 'swr';

export type UseHook<ID, Resource extends Identifiable<ID>, Query> = {
  (selection: ID | undefined, swrConf?: SWRConfiguration): Hook<ID, Resource>;
  (selection: Query | undefined, swrConf?: SWRConfiguration): Hook<
    ID,
    Set<Resource>
  >;
  (): Hook<ID, Set<Resource>>;
};
