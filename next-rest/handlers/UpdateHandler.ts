import {Codec} from '@21gram-consulting/ts-codec';
import {NextApiRequest, NextApiResponse} from 'next';

/**
 * @summary
 * A handler for the `update` operations.
 * @description
 * This handler is called when a `PUT` request is received.
 * @param Resource The type of the resource.
 * @param ID The type of the resource's identifier.
 * @returns A handler function.
 * @template Resource The type of the REST resource.
 * @template ID The type of the resource's identifier.
 * @group Server-Side Resource Handlers
 */
export type UpdateHandler<Resource, ID> = (
  record: Resource,
  codec: Codec<Resource>,
  id: ID,
  request: NextApiRequest,
  response: NextApiResponse
) => Promise<unknown>;

/**
 * @summary
 * A convenience function to create a `UpdateHandler`.
 * @description
 * This function is a convenience function to create a `UpdateHandler`.
 * It merely returns the function you pass "as-is".
 * @param handler The handler function.
 * @returns The same handler function.
 * @template Resource The type of the REST resource.
 * @template ID The type of the resource's identifier.
 * @group Server-Side Resource Handlers
 * @example
 * ```typescript
 * import {UpdateHandler} from '@21gram-consulting/next-rest';
 * import {User, UserID} from './Model';
 *
 * export default UpdateHandler<User, UserID>(async (record, codec, id, request, response) => {
 * // ...
 * });
 * ```
 */
export function UpdateHandler<Resource, ID>(
  handler: UpdateHandler<Resource, ID>
) {
  return handler;
}
