import {Identifiable, isUnidentified} from '#Identifiable';
import {json, urlSearchParams} from '@21gram-consulting/ts-codec';
import {Connector} from './Connector';
import {isId, isQueryDefined} from '#Selection';
import fetch from '#fetch';
import {ClientDescriptor} from '#ClientDescriptor';
import createDeletion from '#clientAction/createDeletion';

export default function createConnector<
  ID extends string,
  Resource extends Identifiable<ID>,
  Query
>(
  descriptor: ClientDescriptor<ID, Resource, Query>
): Connector<ID, Resource, Query> {
  const queryCodec = urlSearchParams(descriptor.query);
  const resourceSetCodec = json.set(descriptor.codec);

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
      return fetch(uri, descriptor.requestInit)
        .then(r => r.text())
        .then(r =>
          isId(arg1) ? descriptor.codec.decode(r) : resourceSetCodec.decode(r)
        );
    }

    if (arg1 instanceof Set)
      return new Set(await Promise.all(Array.from(arg1).map(connector)));

    const payload: RequestInit = {body: descriptor.codec.encode(arg1)};

    if (isUnidentified<ID>(arg1)) {
      return fetch(descriptor.endpoint, {
        ...payload,
        ...descriptor.requestInit,
        method: 'POST',
      })
        .then(r => r.text())
        .then(r => descriptor.codec.decode(r));
    }

    return fetch(descriptor.endpoint.concat('/').concat(arg1.id), {
      ...payload,
      ...descriptor.requestInit,
      method: 'PUT',
    })
      .then(r => r.text())
      .then(r => descriptor.codec.decode(r));
  }

  connector.delete = createDeletion(descriptor);

  return connector;
}
