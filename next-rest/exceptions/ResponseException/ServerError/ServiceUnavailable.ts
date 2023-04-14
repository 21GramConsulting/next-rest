import ServerError from './ServerError';

/**
 * @summary
 * The server is currently unable to handle the request due
 * to a temporary overloading or maintenance of the server.
 * @description
 * The server cannot handle the request (because it is
 * overloaded or down for maintenance). Generally, this is a
 * temporary state.
 * @group HTTP Response Exceptions: 5xx Server Error
 */
export default class ServiceUnavailable extends ServerError {}
