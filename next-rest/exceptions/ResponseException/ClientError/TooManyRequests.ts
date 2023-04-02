import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 429 Too Many Requests.
 * @description
 * The user has sent too many requests in a given amount of
 * time. Intended for use with rate-limiting schemes.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class TooManyRequests extends ClientError {}
