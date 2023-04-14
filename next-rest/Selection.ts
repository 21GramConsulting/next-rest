import {ClientDescriptor, isQueryable} from '#ClientDescriptor';

export type Selection<ID, Query> = Query | ID | undefined;

export const isSelection = <ID extends string, Query>(
  selection: unknown,
  descriptor: ClientDescriptor<ID, any, Query>
): selection is Selection<ID, Query> =>
  isId(selection) || isQuery(selection, descriptor);

export const isId = <ID, Query>(
  selection: Selection<ID, Query>
): selection is ID => typeof selection === 'string';

export const isQuery = <ID extends string, Query>(
  selection: Selection<ID, Query>,
  descriptor: ClientDescriptor<ID, any, Query>
): selection is Query => {
  if (!isQueryable(descriptor)) return false;
  if (typeof selection !== 'object') return false;
  if (selection === null) return false;
  const queryKeys = Object.keys(descriptor.query);
  const selectionKeys = Object.keys(selection);
  return selectionKeys.every(k => queryKeys.includes(k));
};

export const isUndefined = <ID, Query>(
  selection: Selection<ID, Query>
): selection is ID => typeof selection === 'undefined';
