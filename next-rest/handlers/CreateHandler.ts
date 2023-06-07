import {Codec} from '@21gram-consulting/ts-codec';
import {NextApiRequest, NextApiResponse} from 'next';

/**
 * @summary
 * A handler for the `create` operations.
 * @description
 * This handler is called when a `POST` request is received.
 * @param Resource The type of the resource.
 * @returns A handler function.
 * @template Resource The type of the REST resource.
 * @group Server-Side Resource Handlers
 */
export type CreateHandler<Resource> = (
  resource: Resource,
  codec: Codec<Resource>,
  request: NextApiRequest,
  response: NextApiResponse
) => Promise<unknown>;

/**
 * @summary
 * A convenience function to create a `CreateHandler`.
 * @description
 * This function is a convenience function to create a `CreateHandler`.
 * It merely returns the function you pass "as-is".
 * @param handler The handler function.
 * @returns The same handler function.
 * @template Resource The type of the REST resource.
 * @group Server-Side Resource Handlers
 * @example
 * ```typescript
 * import {CreateHandler} from '@21gram-consulting/next-rest';
 * import {User} from './Model';
 *
 * export default CreateHandler<User>(async (resource, codec, request, response) => {
 * // ...
 * });
 * ```
 */
export function CreateHandler<Resource>(handler: CreateHandler<Resource>) {
  return handler;
}
