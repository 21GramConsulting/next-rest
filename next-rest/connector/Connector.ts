import {Identifiable} from '#Identifiable';

export type Connector<ID, Resource extends Identifiable<ID>, Query> = {
  (selection: ID): Promise<Resource>;
  (selection: Query): Promise<Set<Resource>>;
  (resource: Resource): Promise<Resource>;
  (resources: Set<Resource>): Promise<Set<Resource>>;
  delete: {
    (resource: Resource): Promise<void>;
    (resources: Set<Resource>): Promise<void>;
  };
};
