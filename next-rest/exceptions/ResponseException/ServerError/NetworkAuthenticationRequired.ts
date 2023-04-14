import ServerError from './ServerError';

/**
 * @summary
 * The client needs to authenticate to gain network access.
 * @description
 * The client needs to authenticate to gain network access.
 * Intended for use by intercepting proxies used to control
 * access to the network (e.g., "captive portals" used to
 * require agreement to Terms of Service before granting
 * full Internet access via a Wi-Fi hotspot)
 * @group HTTP Response Exceptions: 5xx Server Error
 */
export default class NetworkAuthenticationRequired extends ServerError {}
