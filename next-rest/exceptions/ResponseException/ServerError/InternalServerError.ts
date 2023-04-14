import ServerError from './ServerError';

/**
 * @summary
 * The server encountered an unexpected condition that prevented it from fulfilling the request.
 * @description
 * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
 * @group HTTP Response Exceptions: 5xx Server Error
 */
export default class InternalServerError extends ServerError {}
