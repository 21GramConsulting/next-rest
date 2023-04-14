import ServerError from './ServerError';

/**
 * @summary
 * The server has an internal configuration error: the chosen
 * variant resource is configured to engage in transparent
 * content negotiation itself, and is therefore not a proper
 * end point in the negotiation process.
 * @description
 * Further extensions to the request are required for the
 * server to fulfil it
 * @group HTTP Response Exceptions: 5xx Server Error
 */
export default class NotExtended extends ServerError {}
