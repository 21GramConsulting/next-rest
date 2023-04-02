import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 426 Upgrade Required.
 * @description
 * The client should switch to a different protocol such as
 * TLS/1.3, given in the Upgrade header field.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class UpgradeRequired extends ClientError {}
