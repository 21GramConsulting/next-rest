import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 423 Locked.
 * @description
 * The resource that is being accessed is locked.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class Locked extends ClientError {}
