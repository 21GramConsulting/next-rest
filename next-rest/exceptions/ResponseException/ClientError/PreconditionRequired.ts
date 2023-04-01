import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 428 Precondition Required.
 * @description
 * The origin server requires the request to be conditional.
 * Intended to prevent the 'lost update' problem, where a
 * client GETs a resource's state, modifies it, and PUTs it
 * back to the server, when meanwhile a third party has
 * modified the state on the server, leading to a conflict.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class PreconditionRequired extends ClientError { }
