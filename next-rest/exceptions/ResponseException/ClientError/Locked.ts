import ClientError from './ClientError';

/**
 * @summary Represents a 423 Locked.
 * @description
 * The resource that is being accessed is locked.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export default class Locked extends ClientError {}
