import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 407 Proxy Authentication Required.
 * @description
 * The client must first authenticate itself with the proxy.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class ProxyAuthenticationRequired extends ClientError { }
