import ServerError from './ServerError';

/**
 * @summary
 * The server, while acting as a gateway or proxy, received
 * an invalid response from the upstream server it accessed
 * in attempting to fulfill the request.
 * @description
 * The server was acting as a gateway or proxy and received
 * an invalid response from the upstream server.
 * @group HTTP Response Exceptions: 5xx Server Error
 */
export default class BadGateway extends ServerError {}
