import ClientError from './ClientError';

/**
 * @summary Represents a 411 Length Required error.
 * @description
 * The request did not specify the length of its content,
 * which is required by the requested resource.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export default class LengthRequired extends ClientError {}
