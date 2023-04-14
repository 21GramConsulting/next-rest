import {FetchRequest} from '#FetchRequest';
import BadGateway from '#exceptions/ResponseException/ServerError/BadGateway';
import GatewayTimeout from '#exceptions/ResponseException/ServerError/GatewayTimeout';
import HTTPVersionNotSupported from '#exceptions/ResponseException/ServerError/HTTPVersionNotSupported';
import InsufficientStorage from '#exceptions/ResponseException/ServerError/InsufficientStorage';
import InternalServerError from '#exceptions/ResponseException/ServerError/InternalServerError';
import LoopDetected from '#exceptions/ResponseException/ServerError/LoopDetected';
import NetworkAuthenticationRequired from '#exceptions/ResponseException/ServerError/NetworkAuthenticationRequired';
import NotExtended from '#exceptions/ResponseException/ServerError/NotExtended';
import NotImplemented from '#exceptions/ResponseException/ServerError/NotImplemented';
import ServerError from '#exceptions/ResponseException/ServerError/ServerError';
import ServiceUnavailable from '#exceptions/ResponseException/ServerError/ServiceUnavailable';
import VariantAlsoNegotiates from '#exceptions/ResponseException/ServerError/VariantAlsoNegotiates';

export const serverError = (request: FetchRequest, response: Response) => {
  switch (Math.floor(response.status % 100)) {
    case 0:
      throw new InternalServerError('Internal Server Error', request, response);
    case 1:
      throw new NotImplemented('Not Implemented', request, response);
    case 2:
      throw new BadGateway('Bad Gateway', request, response);
    case 3:
      throw new ServiceUnavailable('Service Unavailable', request, response);
    case 4:
      throw new GatewayTimeout('Gateway Timeout', request, response);
    case 5:
      throw new HTTPVersionNotSupported(
        'HTTP Version Not Supported',
        request,
        response
      );
    case 6:
      throw new VariantAlsoNegotiates(
        'Variant Also Negotiates',
        request,
        response
      );
    case 7:
      throw new InsufficientStorage('Insufficient Storage', request, response);
    case 8:
      throw new LoopDetected('Loop Detected', request, response);
    case 10:
      throw new NotExtended('Not Extended', request, response);
    case 11:
      throw new NetworkAuthenticationRequired(
        'Network Authentication Required',
        request,
        response
      );
    default:
      throw new ServerError('A server error occurred.', request, response);
  }
};
