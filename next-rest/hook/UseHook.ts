import {Identifiable} from '#Identifiable';
import {Query as QueryOf} from '#Query';
import {Selection as SelectionType} from '#hook/Selection';
import {Hook} from '#hook/Hook';

// @formatter:off
export type UseHook<
  ID,
  Record extends Identifiable<ID>,
  Query extends QueryOf<Record>,
  Selection extends SelectionType<ID, Record, Query>
> = {
  (selection: ID): Hook<ID, Record>;
  (selection: Query): Hook<ID, Set<Record>>;
  (): Hook<ID, Set<Record>>;
};

// @formatter:on
