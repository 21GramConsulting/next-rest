import ServerError from './ServerError';

/**
 * @summary
 * The server is unable to store the representation needed to complete the request.
 * @description
 * The server is unable to store the representation needed to complete the request.
 * @group HTTP Response Exceptions: 5xx Server Error
 */
export default class InsufficientStorage extends ServerError {}
