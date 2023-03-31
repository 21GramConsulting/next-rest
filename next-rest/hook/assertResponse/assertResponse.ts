import { FetchRequest } from '#rest/FetchRequest';
import { clientError } from '#rest/hook/assertResponse/clientError';
import { serverError } from '#rest/hook/assertResponse/serverError';
import { Exception } from '#rest/Exception';

export const assertResponse = (request: FetchRequest, response: Response): Exception | void => {
  // @formatter:off
  switch (Math.floor(response.status / 100)) {
    case 1:  return; // TODO: treat properly
    case 2:  return;
    case 3:  return; // TODO: treat properly
    case 4:  return clientError(request, response);
    case 5:  return serverError(request,response);
    default: throw new Exception(
      `A non-standard status code was received!`,
      request,
      response
    );
  }
  // @formatter:on
};
