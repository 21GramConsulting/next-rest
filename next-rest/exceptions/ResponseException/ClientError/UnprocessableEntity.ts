import ClientError from './ClientError';

/**
 * @summary Represents a 422 Unprocessable Entity.
 * @description
 * The request was well-formed but was unable to be followed
 * due to semantic errors.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export default class UnprocessableEntity extends ClientError {}
