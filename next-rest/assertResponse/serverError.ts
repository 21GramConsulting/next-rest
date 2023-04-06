import {FetchRequest} from '#FetchRequest';
import ServerError from '#exceptions/ResponseException/ServerError/ServerError';

export const serverError = (request: FetchRequest, response: Response) => {
  // TODO: implement switch statement and treat all differently.
  throw new ServerError('A server error occurred.', request, response);
};
