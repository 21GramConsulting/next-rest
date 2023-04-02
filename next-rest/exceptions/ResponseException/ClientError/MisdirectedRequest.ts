import {ClientError} from './ClientError';

/**
 * @summary Represents a 421 Misdirected Request.
 * @description
 * The request was directed at a server that is not able to
 * produce a response (for example because of connection reuse).
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class MisdirectedRequest extends ClientError {}
