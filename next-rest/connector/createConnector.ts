import {Identifiable, isUnidentified} from '#Identifiable';
import {json, urlSearchParams} from '@21gram-consulting/ts-codec';
import {Connector} from './Connector';
import {isId, isQueryDefined} from '#Selection';
import fetch from '#fetch';
import {ClientDescriptor} from '#ClientDescriptor';
import createDeletion from '#clientAction/createDeletion';
import createInsertion from '#clientAction/createInsertion';

export default function createConnector<
  ID extends string,
  Resource extends Identifiable<ID>,
  Query
>(
  descriptor: ClientDescriptor<ID, Resource, Query>
): Connector<ID, Resource, Query> {
  const queryCodec = urlSearchParams(descriptor.query);
  const resourceSetCodec = json.set(descriptor.codec);
  const insertion = createInsertion(descriptor);
  const deletion = createDeletion(descriptor);

  async function connector(selection: ID): Promise<Resource>;
  async function connector(selection: Query): Promise<Set<Resource>>;
  async function connector(resource: Resource): Promise<Resource>;
  async function connector(resources: Set<Resource>): Promise<Set<Resource>>;
  async function connector(arg1?: any): Promise<any> {
    const uri = isId(arg1)
      ? descriptor.endpoint.concat('/').concat(arg1)
      : isQueryDefined(arg1)
      ? descriptor.endpoint.concat('?').concat(queryCodec.encode(arg1))
      : undefined;

    if (uri) {
      return fetch(uri, {...descriptor.requestInit, method: 'GET'})
        .then(r => r.text())
        .then(r =>
          isId(arg1) ? descriptor.codec.decode(r) : resourceSetCodec.decode(r)
        );
    }

    return insertion(arg1);
  }

  connector.delete = deletion;

  return connector;
}
