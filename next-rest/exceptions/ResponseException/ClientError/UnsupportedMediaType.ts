import ClientError from './ClientError';

/**
 * @summary Represents a 415 Unsupported Media Type.
 * @description
 * The request entity has a media type which the server or
 * resource does not support. For example, the client
 * uploads an image as image/svg+xml, but the server
 * requires that images use a different format.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export default class UnsupportedMediaType extends ClientError {}
