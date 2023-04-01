import {Identifiable} from '#Identifiable';
import {Query as QueryOf} from '#Query';

export type Selection<
  ID,
  Resource extends Identifiable<ID>,
  Query extends QueryOf<Resource>
> = Query | ID | undefined;

export const isSelection = <
  ID,
  Resource extends Identifiable<ID>,
  Query extends QueryOf<Resource>
>(
  selection: any
): selection is Selection<ID, Resource, Query> =>
  isId(selection) || isQuery(selection);
export const isId = <
  ID,
  Resource extends Identifiable<ID>,
  Query extends QueryOf<Resource>
>(
  selection: Selection<ID, Resource, Query>
): selection is ID => typeof selection === 'string';
export const isQuery = <
  ID,
  Resource extends Identifiable<ID>,
  Query extends QueryOf<Resource>
>(
  selection: Selection<ID, Resource, Query>
): selection is Query => isQueryDefined(selection) || isUndefined(selection);
export const isQueryDefined = <
  ID,
  Resource extends Identifiable<ID>,
  Query extends QueryOf<Resource>
>(
  selection: Selection<ID, Resource, Query>
): selection is Query => typeof selection === 'object';
export const isUndefined = <
  ID,
  Resource extends Identifiable<ID>,
  Query extends QueryOf<Resource>
>(
  selection: Selection<ID, Resource, Query>
): selection is ID => typeof selection === 'undefined';
