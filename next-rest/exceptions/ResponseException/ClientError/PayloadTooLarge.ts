import ClientError from './ClientError';

/**
 * @summary Represents a 413 Payload Too Large error.
 * @description
 * The request is larger than the server is willing or able
 * to process. Previously called "Request Entity Too Large"
 * in RFC 2616
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export default class PayloadTooLarge extends ClientError {}
