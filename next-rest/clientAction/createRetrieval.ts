import {ClientDescriptor, isQueryable} from '#ClientDescriptor';
import {Identifiable} from '#Identifiable';
import {CancellablePromise} from 'real-cancellable-promise';
import fetch from '#fetch';
import {isId, isQuery} from '#Selection';
import {json, urlSearchParams} from '@21gram-consulting/ts-codec';
import {BadRequest} from '#exceptions';

export type Key<
  ID extends string,
  Resource extends Identifiable<ID>,
  Query,
  Filter = ID | Query
> = {
  descriptor: ClientDescriptor<ID, Resource, Query>;
  filter: Filter;
};
export const isKey = <
  ID extends string,
  Resource extends Identifiable<ID>,
  Query
>(
  value: any
): value is Key<ID, Resource, Query> => {
  if (typeof value !== 'object') return false;
  if (value === null) return false;
  if (!('descriptor' in value)) return false;
  // TODO: implement isDescriptor :)
  if (typeof value.descriptor !== 'object') return false;
  if (!('filter' in value)) return false;
  if (isId(value.filter)) return true;
  if (isQuery(value.filter, value.descriptor)) return true;
  return false;
};

export default function createRetrieval<
  ID extends string,
  Resource extends Identifiable<ID>,
  Query
>(
  descriptor: ClientDescriptor<ID, Resource, Query>
): {
  (selection: ID): CancellablePromise<Resource>;
  (selection: Query): CancellablePromise<Set<Resource>>;
} {
  const queryCodec = isQueryable(descriptor)
    ? urlSearchParams(descriptor.query)
    : undefined;
  const resourceSetCodec = json.set(descriptor.codec);

  function retrieval(selection: ID): CancellablePromise<Resource>;
  function retrieval(selection: Query): CancellablePromise<Set<Resource>>;
  function retrieval(
    selection: Key<ID, Resource, Query, ID>
  ): CancellablePromise<Resource>;
  function retrieval(
    selection: Key<ID, Resource, Query, Query>
  ): CancellablePromise<Set<Resource>>;
  function retrieval(arg1: any): CancellablePromise<any> {
    let uri = descriptor.endpoint;

    if (isKey(arg1)) arg1 = arg1.filter;
    if (isId(arg1)) uri = uri.concat('/').concat(arg1);
    else if (queryCodec) uri = uri.concat('?').concat(queryCodec.encode(arg1));
    else {
      const response = new Response(null, {status: 400});
      const error = new BadRequest('Invalid selection.', uri, response);
      return CancellablePromise.reject(error);
    }

    console.log('\n\n\n******\n\n\n');
    console.log('arg1', arg1);
    console.log('uri', uri);
    console.log('\n\n\n******\n\n\n');

    return fetch(uri, {...descriptor.requestInit, method: 'GET'})
      .then(r => r.text())
      .then(r =>
        isId(arg1) ? descriptor.codec.decode(r) : resourceSetCodec.decode(r)
      );
  }

  return retrieval;
}
