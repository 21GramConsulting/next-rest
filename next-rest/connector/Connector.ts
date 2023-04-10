import {Identifiable} from '#Identifiable';
import {CancellablePromise} from 'real-cancellable-promise';

export type Connector<ID, Resource extends Identifiable<ID>, Query> = {
  (selection: ID): CancellablePromise<Resource>;
  (selection: Query): CancellablePromise<Set<Resource>>;
  (resource: Resource): CancellablePromise<Resource>;
  (resources: Set<Resource>): CancellablePromise<Set<Resource>>;
  delete: {
    (resource: Resource): CancellablePromise<void>;
    (resources: Set<Resource>): CancellablePromise<void>;
  };
};
