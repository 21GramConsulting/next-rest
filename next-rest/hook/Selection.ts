import {Identifiable} from '#Identifiable';
import {Query as QueryOf} from '#Query';

export type Selection<
  ID,
  Record extends Identifiable<ID>,
  Query extends QueryOf<Record>
> = Query | ID | undefined;

export const isSelection = <
  ID,
  Record extends Identifiable<ID>,
  Query extends QueryOf<Record>
>(
  selection: any
): selection is Selection<ID, Record, Query> =>
  isId(selection) || isQuery(selection);
export const isId = <
  ID,
  Record extends Identifiable<ID>,
  Query extends QueryOf<Record>
>(
  selection: Selection<ID, Record, Query>
): selection is ID => typeof selection === 'string';
export const isQuery = <
  ID,
  Record extends Identifiable<ID>,
  Query extends QueryOf<Record>
>(
  selection: Selection<ID, Record, Query>
): selection is Query => isQueryDefined(selection) || isUndefined(selection);
export const isQueryDefined = <
  ID,
  Record extends Identifiable<ID>,
  Query extends QueryOf<Record>
>(
  selection: Selection<ID, Record, Query>
): selection is Query => typeof selection === 'object';
export const isUndefined = <
  ID,
  Record extends Identifiable<ID>,
  Query extends QueryOf<Record>
>(
  selection: Selection<ID, Record, Query>
): selection is ID => typeof selection === 'undefined';
