import ServerError from './ServerError';

/**
 * @summary
 * The server has found a variant for the requested resource
 * that is itself a negotiable resource.
 * @description
 * Transparent content negotiation for the request results
 * in a circular reference.
 * @group HTTP Response Exceptions: 5xx Server Error
 */
export default class VariantAlsoNegotiates extends ServerError {}
