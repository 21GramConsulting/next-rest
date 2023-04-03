import {Create} from './Create';
import {Read} from './Read';
import {ReadSet} from './ReadSet';
import {Delete} from './Delete';
import {Update} from './Update';

/**
 * @summary
 * A description of a resource handler.
 * @description
 * This is practically a convenient type.
 * We suggest its usage, but it is not required.
 * @template Resource The type of the resource.
 * @template ID The type of the resource's identifier.
 * @template Query The type of the resource's query.
 * @group Core API
 */
export type Description<Resource, ID, Query> =
  | Create<Resource>
  | ReadSet<Resource, Query>
  | Read<Resource, ID>
  | Delete<Resource, ID>
  | Update<Resource, ID>;
