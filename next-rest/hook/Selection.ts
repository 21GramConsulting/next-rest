export type Selection<ID, Query> = Query | ID | undefined;

export const isSelection = <ID, Query>(
  selection: unknown
): selection is Selection<ID, Query> => isId(selection) || isQuery(selection);

export const isId = <ID, Query>(
  selection: Selection<ID, Query>
): selection is ID => typeof selection === 'string';

export const isQuery = <ID, Query>(
  selection: Selection<ID, Query>
): selection is Query => isQueryDefined(selection) || isUndefined(selection);

export const isQueryDefined = <ID, Query>(
  selection: Selection<ID, Query>
): selection is Query => typeof selection === 'object';

export const isUndefined = <ID, Query>(
  selection: Selection<ID, Query>
): selection is ID => typeof selection === 'undefined';
