import ServerError from './ServerError';

/**
 * @summary
 * The server, while acting as a gateway or proxy, did not receive
 * a timely response from the upstream server specified by the URI
 * (e.g. HTTP, FTP, LDAP) or some other auxiliary server (e.g. DNS)
 * it needed to access in attempting to complete the request.
 * @description
 * The server was acting as a gateway or proxy and did not receive
 * a timely response from the upstream server.
 * @group HTTP Response Exceptions: 5xx Server Error
 */
export default class GatewayTimeout extends ServerError {}
