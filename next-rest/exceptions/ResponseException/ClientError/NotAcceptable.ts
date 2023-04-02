import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 406 Not Acceptable.
 * @description
 * The requested resource is capable of generating only
 * content not acceptable according to the Accept headers
 * sent in the request. See Content negotiation.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class NotAcceptable extends ClientError {}
