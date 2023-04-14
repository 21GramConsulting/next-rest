import {Identifiable} from '#Identifiable';
import {Connector} from './Connector';
import {isId, isQuery} from '#Selection';
import {ClientDescriptor} from '#ClientDescriptor';
import createDeletion from '#clientAction/createDeletion';
import createInsertion from '#clientAction/createInsertion';
import createRetrieval from '#clientAction/createRetrieval';
import {CancellablePromise} from 'real-cancellable-promise';

export default function createConnector<
  ID extends string,
  Resource extends Identifiable<ID>,
  Query
>(
  descriptor: ClientDescriptor<ID, Resource, Query>
): Connector<ID, Resource, Query> {
  const insertion = createInsertion(descriptor);
  const deletion = createDeletion(descriptor);
  const retrieval = createRetrieval(descriptor);

  function connector(selection: ID): CancellablePromise<Resource>;
  function connector(selection: Query): CancellablePromise<Set<Resource>>;
  function connector(resource: Resource): CancellablePromise<Resource>;
  function connector(
    resources: Set<Resource>
  ): CancellablePromise<Set<Resource>>;
  function connector(arg1?: any): CancellablePromise<any> {
    if (isId(arg1)) return retrieval(arg1);
    if (isQuery(arg1, descriptor)) return retrieval(arg1);
    return insertion(arg1);
  }

  connector.delete = deletion;

  return connector;
}
