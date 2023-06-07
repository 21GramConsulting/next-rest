import {NextApiRequest, NextApiResponse} from 'next';

/**
 * @summary
 * A handler for the `delete` operations.
 * @description
 * This handler is called when a `DELETE` request is received.
 * @param Query The type of the query.
 * @returns A handler function.
 * @template Query The type of the query.
 * @group Server-Side Resource Handlers
 */
export type DeleteHandler<Query> = (
  query: Query,
  request: NextApiRequest,
  response: NextApiResponse
) => Promise<unknown>;

/**
 * @summary
 * A convenience function to create a `DeleteHandler`.
 * @description
 * This function is a convenience function to create a `DeleteHandler`.
 * It merely returns the function you pass "as-is".
 * @param handler The handler function.
 * @returns The same handler function.
 * @template Query The type of the query.
 * @group Server-Side Resource Handlers
 * @example
 * ```typescript
 * import {DeleteHandler} from '@21gram-consulting/next-rest';
 * import {UserID} from './Model';
 *
 * export default DeleteHandler<UserID>(async (id, request, response) => {
 * // ...
 * });
 * ```
 */
export function DeleteHandler<Query>(handler: DeleteHandler<Query>) {
  return handler;
}
