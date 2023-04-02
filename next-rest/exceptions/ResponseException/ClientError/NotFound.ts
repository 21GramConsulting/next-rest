import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 404 Not Found.
 * @description
 * The requested resource could not be found but may be
 * available in the future. Subsequent requests by the
 * client are permissible.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class NotFound extends ClientError {}
