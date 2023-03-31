import { FetchRequest } from '#rest/FetchRequest';
import { ServerError } from '#rest/exceptions/ResponseException/ServerError';

export const serverError = (request: FetchRequest, response: Response) => {
  // TODO: implement switch statement and treat all differently.
  throw new ServerError(
    `A server error occurred.`,
    request,
    response,
  );
};
