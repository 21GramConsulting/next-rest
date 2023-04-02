import {ClientError} from './ClientError';

/**
 * @summary Represents a 417 Expectation Failed.
 * @description
 * The server cannot meet the requirements of the Expect
 * request-header field.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class ExpectationFailed extends ClientError {}
