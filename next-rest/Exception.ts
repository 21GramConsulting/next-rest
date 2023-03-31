import {FetchRequest} from '#FetchRequest';

export class Exception extends Error {
  public readonly request: FetchRequest;
  public readonly response: Response;

  constructor(message: string, request: FetchRequest, response: Response) {
    super(message);
    this.request = request;
    this.response = response;
  }
}
