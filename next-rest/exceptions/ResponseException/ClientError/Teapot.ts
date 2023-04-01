import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 418 I'm a teapot.
 * @description
 * This code was defined in 1998 as one of the traditional
 * IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee
 * Pot Control Protocol, and is not expected to be
 * implemented by actual HTTP servers. The RFC specifies
 * this code should be returned by teapots requested to
 * brew coffee. This HTTP status is used as an Easter
 * egg in some websites, such as Google.com's "I'm a teapot"
 * easter egg. Sometimes, this status code is
 * also used as a response to a blocked request, instead of
 * the more appropriate 403 Forbidden.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class Teapot extends ClientError { }
