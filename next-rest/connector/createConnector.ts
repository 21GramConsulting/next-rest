import {Identifiable} from '#Identifiable';
import {Codec} from '@21gram-consulting/ts-codec';
import {Connector} from './Connector';

export default function createConnector<
  ID extends string,
  Resource extends Identifiable<ID>,
  Query
>(
  endpoint: string,
  codec: Codec<Resource>,
  query: RecordShape<Query>
): Connector<ID, Resource, Query> {
  async function connector(): Promise<Resource>;
  async function connector(selection: ID): Promise<Resource>;
  async function connector(selection: Query): Promise<Set<Resource>>;
  async function connector(resource: Resource): Promise<Resource>;
  async function connector(resources: Set<Resource>): Promise<Set<Resource>>;
  async function connector(arg1?: any): Promise<any> {}

  async function deletion(resource: Resource): Promise<void>;
  async function deletion(resources: Set<Resource>): Promise<void>;
  async function deletion(arg1: any): Promise<void> {}

  connector.delete = deletion;
  return connector;
}
