import ServerError from './ServerError';

/**
 * @summary
 * The server has detected a loop while processing the request.
 * @description
 * The server detected an infinite loop while processing the request
 * @group HTTP Response Exceptions: 5xx Server Error
 */
export default class LoopDetected extends ServerError {}
