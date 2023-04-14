import ServerError from './ServerError';

/**
 * @summary
 * The server does not support the functionality required to
 * fulfill the request.
 * @description
 * The server either does not recognize the request method,
 * or it lacks the ability to fulfil the request. Usually
 * this implies future availability (e.g., a new feature of
 * a web-service API).
 * @group HTTP Response Exceptions: 5xx Server Error
 */
export default class NotImplemented extends ServerError {}
