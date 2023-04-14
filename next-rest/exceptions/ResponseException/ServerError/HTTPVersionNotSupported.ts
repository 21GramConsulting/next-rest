import ServerError from './ServerError';

/**
 * @summary
 * The server does not support, or refuses to support, the HTTP protocol version
 * that was used in the request message.
 * @description
 * The server does not support, or refuses to support, the major version of
 * HTTP that was used in the request message.
 * @group HTTP Response Exceptions: 5xx Server Error
 */
export default class HTTPVersionNotSupported extends ServerError {}
