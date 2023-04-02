import {ClientError} from './ClientError';

/**
 * @summary Represents a 431 Request Header Fields Too Large.
 * @description
 * The server is unwilling to process the request because
 * either an individual header field, or all the header
 * fields collectively, are too large.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class RequestHeaderFieldsTooLarge extends ClientError {}
