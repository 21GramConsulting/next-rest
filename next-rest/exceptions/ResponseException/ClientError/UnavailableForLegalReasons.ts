import ClientError from './ClientError';

/**
 * @summary Represents a 451 Unavailable For Legal Reasons.
 * @description
 * A server operator has received a legal demand to deny
 * access to a resource or to a set of resources that
 * includes the requested resource. The code 451 was
 * chosen as a reference to the novel Fahrenheit 451 (see
 * the Acknowledgements in the RFC).
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export default class UnavailableForLegalReasons extends ClientError {}
