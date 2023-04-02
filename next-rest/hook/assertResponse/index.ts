import {FetchRequest} from '#FetchRequest';
import {clientError} from '#hook/assertResponse/clientError';
import {serverError} from '#hook/assertResponse/serverError';
import Exception from '#Exception';

export default (
  request: FetchRequest,
  response: Response
): Exception | void => {
  switch (Math.floor(response.status / 100)) {
    case 1:
      return; // TODO: treat properly
    case 2:
      return;
    case 3:
      return; // TODO: treat properly
    case 4:
      return clientError(request, response);
    case 5:
      return serverError(request, response);
    default:
      throw new Exception(
        'A non-standard status code was received!',
        request,
        response
      );
  }
};
