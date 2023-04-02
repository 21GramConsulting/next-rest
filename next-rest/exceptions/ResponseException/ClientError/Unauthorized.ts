import ClientError from './ClientError';

/**
 * @summary Represents a 401 Unauthorized.
 * @description
 * Similar to 403 Forbidden, but specifically for use when
 * authentication is required and has failed or has not yet
 * been provided. The response must include a
 * WWW-Authenticate header field containing a challenge
 * applicable to the requested resource. See Basic access
 * authentication and Digest access authentication. 401
 * semantically means "unauthorised", the user does not
 * have valid authentication credentials for the target
 * resource.
 *
 * Some sites incorrectly issue HTTP 401 when an IP address
 * is banned from the website (usually the website domain)
 * and that specific address is refused permission to access
 * a website
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export default class Unauthorized extends ClientError {}
