import ResponseException from '../ResponseException';

/**
 * @summary Represents a 4xx Client Error.
 * @description
 * This class of status code is intended for situations in
 * which the error seems to have been caused by the client.
 * Except when responding to a HEAD request, the server
 * should include an entity containing an explanation of
 * the error situation, and whether it is a temporary or
 * permanent condition. These status codes are applicable
 * to any request method. User agents should display any
 * included entity to the user.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export default class ClientError extends ResponseException {}
