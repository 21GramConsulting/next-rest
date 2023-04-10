import {ClientDescriptor} from '#ClientDescriptor';
import {Identifiable} from '#Identifiable';
import {CancellablePromise} from 'real-cancellable-promise';
import fetch from '#fetch';
import {isId} from '#Selection';
import {json, urlSearchParams} from '@21gram-consulting/ts-codec';

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
  const queryCodec = urlSearchParams(descriptor.query);
  const resourceSetCodec = json.set(descriptor.codec);

  function retrieval(selection: ID): CancellablePromise<Resource>;
  function retrieval(selection: Query): CancellablePromise<Set<Resource>>;
  function retrieval(arg1: any): CancellablePromise<any> {
    const uri = isId(arg1)
      ? descriptor.endpoint.concat('/').concat(arg1)
      : descriptor.endpoint.concat('?').concat(queryCodec.encode(arg1));

    return fetch(uri, {...descriptor.requestInit, method: 'GET'})
      .then(r => r.text())
      .then(r =>
        isId(arg1) ? descriptor.codec.decode(r) : resourceSetCodec.decode(r)
      );
  }

  return retrieval;
}
