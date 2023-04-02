import {ClientError} from './ClientError';

/**
 * @summary Represents a 405 Method Not Allowed.
 * @description
 * A request method is not supported for the requested
 * resource; for example, a GET request on a form that
 * requires data to be presented via POST, or a PUT request
 * on a read-only resource.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class MethodNotAllowed extends ClientError {}
