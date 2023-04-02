import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 424 Failed Dependency.
 * @description
 * The request failed because it depended on another request
 * and that request failed (e.g., a PROPPATCH).
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class FailedDependency extends ClientError {}
