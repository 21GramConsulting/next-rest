import {ClientDescriptor} from '#ClientDescriptor';
import {Identifiable, isUnidentified} from '#Identifiable';
import {CancellablePromise} from 'real-cancellable-promise';
import fetch from '#fetch';

export default function createInsertion<
  ID extends string,
  Resource extends Identifiable<ID>,
  Query
>(descriptor: ClientDescriptor<ID, Resource, Query>) {
  function insertion(resource: Resource): CancellablePromise<Resource>;
  function insertion(
    resources: Set<Resource>
  ): CancellablePromise<Set<Resource>>;
  function insertion(arg1: any): CancellablePromise<any> {
    if (arg1 instanceof Set) {
      return CancellablePromise.all(Array.from(arg1).map(insertion)).then(
        resources => new Set(resources)
      );
    }

    const payload: RequestInit = {
      ...descriptor.requestInit,
      body: descriptor.codec.encode(arg1),
    };
    const promise = isUnidentified<ID>(arg1)
      ? fetch(descriptor.endpoint, {...payload, method: 'POST'})
      : fetch(descriptor.endpoint.concat('/').concat(arg1.id), {
          ...payload,
          method: 'PUT',
        });

    return promise.then(r => r.text()).then(r => descriptor.codec.decode(r));
  }

  return insertion;
}
