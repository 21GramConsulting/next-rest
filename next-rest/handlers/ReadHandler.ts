import {Codec} from '@21gram-consulting/ts-codec';
import {NextApiRequest, NextApiResponse} from 'next';

/**
 * @summary
 * A handler for the `read` operations.
 * @description
 * This handler is called when a `GET` request is received.
 * @param Resource The type of the resource.
 * @param ID The type of the resource's identifier.
 * @returns A handler function.
 * @template Resource The type of the REST resource.
 * @template ID The type of the resource's identifier.
 * @group Server-Side Resource Handlers
 */
export type ReadHandler<Resource, ID> = (
  codec: Codec<Resource>,
  id: ID,
  request: NextApiRequest,
  response: NextApiResponse
) => Promise<unknown>;

/**
 * @summary
 * A convenience function to create a `ReadHandler`.
 * @description
 * This function is a convenience function to create a `ReadHandler`.
 * It merely returns the function you pass "as-is".
 * @param handler The handler function.
 * @returns The same handler function.
 * @template Resource The type of the REST resource.
 * @template ID The type of the resource's identifier.
 * @group Server-Side Resource Handlers
 * @example
 * ```typescript
 * import {ReadHandler} from '@21gram-consulting/next-rest';
 * import {User, UserID} from './Model';
 *
 * export default ReadHandler<User, UserID>(async (codec, id, request, response) => {
 *  // ...
 * });
 * ```
 */
export function ReadHandler<Resource, ID>(handler: ReadHandler<Resource, ID>) {
  return handler;
}
