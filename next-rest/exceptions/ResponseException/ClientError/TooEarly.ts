import ClientError from './ClientError';

/**
 * @summary Represents a 425 Too Early.
 * @description
 * Indicates that the server is unwilling to risk
 * processing a request that might be replayed.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export default class TooEarly extends ClientError {}
