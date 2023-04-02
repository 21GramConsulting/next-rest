import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 412 Precondition Failed.
 * @description
 * The server does not meet one of the preconditions that
 * the requester put on the request header fields.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class PreconditionFailed extends ClientError {}
