import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 409 Conflict.
 * @description
 * Indicates that the request could not be processed because
 * of conflict in the current state of the resource, such as
 * an edit conflict between multiple simultaneous updates.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class Conflict extends ClientError {}
