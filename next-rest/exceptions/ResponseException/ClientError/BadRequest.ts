import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 400 Bad Request.
 * @description
 * he server cannot or will not process the request due to
 *  an apparent client error (e.g., malformed request syntax,
 *  size too large, invalid request message framing, or
 * deceptive request routing).
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class BadRequest extends ClientError { }
