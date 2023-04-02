import {FetchRequest} from '#FetchRequest';

/**
 * @summary Represents an exception thrown by Next-Rest.
 * @description
 * This class is used to represent an exception thrown by Next-Rest.
 * It's the basetype for all other exceptions.
 * @public
 * @group Exceptions
 */
export default class Exception extends Error {
  /**
   * @summary The request in action when the exception was thrown.
   */
  public readonly request: FetchRequest;

  /**
   * @summary The response in action when the exception was thrown.
   */
  public readonly response: Response;

  /**
   * @summary Creates a new Next-Rest Exception.
   * @param message The message to display.
   * @param request The request in action when the exception was thrown.
   * @param response The response in action when the exception was thrown.
   * @internal
   */
  constructor(message: string, request: FetchRequest, response: Response) {
    super(message);
    this.request = request;
    this.response = response;
  }
}
