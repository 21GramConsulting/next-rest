import {Identifiable} from '#Identifiable';
import {Selection as SelectionType} from '#hook/Selection';
import {Hook} from '#hook/Hook';

export type UseHook<
  ID,
  Resource extends Identifiable<ID>,
  Query,
  _Selection extends SelectionType<ID, Resource, Query>
> = {
  (selection: ID): Hook<ID, Resource>;
  (selection: Query): Hook<ID, Set<Resource>>;
  (): Hook<ID, Set<Resource>>;
};
