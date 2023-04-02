import ClientError from './ClientError';

/**
 * @summary Represents a 408 Request Timeout.
 * @description
 * The server timed out waiting for the request. According
 * to HTTP specifications: "The client did not produce a
 * request within the time that the server was prepared to
 * wait. The client MAY repeat the request without
 * modifications at any later time."
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export default class RequestTimeout extends ClientError {}
