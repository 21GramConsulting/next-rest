import {ClientDescriptor, isQueryable} from '#ClientDescriptor';
import {Identifiable} from '#Identifiable';
import {CancellablePromise} from 'real-cancellable-promise';
import fetch from '#fetch';
import {isId} from '#Selection';
import {json, urlSearchParams} from '@21gram-consulting/ts-codec';
import {BadRequest} from '#exceptions';

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
  function retrieval(arg1: any): CancellablePromise<any> {
    let uri = descriptor.endpoint;
    if (isId(arg1)) uri = uri.concat('/').concat(arg1);
    else if (queryCodec) uri = uri.concat('?').concat(queryCodec.encode(arg1));
    else {
      const response = new Response(null, {status: 400});
      const error = new BadRequest('Invalid selection.', uri, response);
      return CancellablePromise.reject(error);
    }

    return fetch(uri, {...descriptor.requestInit, method: 'GET'})
      .then(r => r.text())
      .then(r =>
        isId(arg1) ? descriptor.codec.decode(r) : resourceSetCodec.decode(r)
      );
  }

  return retrieval;
}
