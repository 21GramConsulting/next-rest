import ClientError from './ClientError';

/**
 * @summary Represents a 414 URL Too Long error.
 * @description
 * The URI provided was too long for the server to process.
 * Often the result of too much data being encoded as a
 * query-string of a GET request, in which case it should
 * be converted to a POST request. Called "Request-URI Too
 * Long" previously in RFC 2616.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export default class URITooLong extends ClientError {}
