import {Identifiable} from '#Identifiable';
import {Hook} from '#hook/Hook';

export type UseHook<ID, Resource extends Identifiable<ID>, Query> = {
  (selection: ID): Hook<ID, Resource>;
  (selection: Query): Hook<ID, Set<Resource>>;
  (): Hook<ID, Set<Resource>>;
};
