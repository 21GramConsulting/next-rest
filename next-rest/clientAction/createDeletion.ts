import {ClientDescriptor} from '#ClientDescriptor';
import {Identifiable} from '#Identifiable';
import {CancellablePromise} from 'real-cancellable-promise';
import fetch from '#fetch';

export default function createDeletion<
  ID extends string,
  Resource extends Identifiable<ID>,
  Query
>(
  descriptor: ClientDescriptor<ID, Resource, Query>
): {
  (resource: Resource): CancellablePromise<void>;
  (resource: Set<Resource>): CancellablePromise<void>;
} {
  function deletion(value: Resource): CancellablePromise<void>;
  function deletion(value: Set<Resource>): CancellablePromise<void>;
  function deletion(value: any): CancellablePromise<void> {
    if (value instanceof Set) {
      return CancellablePromise.all(Array.from(value).map(deletion)).then();
    }

    const uri = descriptor.endpoint.concat('/').concat(value.id);
    return fetch(uri, {...descriptor.requestInit, method: 'DELETE'})
      .then(v => v.text())
      .then(r => descriptor.codec.decode(r))
      .then();
  }

  return deletion;
}
