import {FetchRequest} from '#FetchRequest';
import {serverError} from '#assertResponse/serverError';
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

describe('serverError', () => {
  describe('on known status code', () => {
    it.each(exceptionMap())(
      'should throw %d related exception.',
      (status, factory) => {
        const request: FetchRequest = 'https://test.local';
        const response = new Response('', {status});
        expect(() => serverError(request, response)).toThrow(
          factory(request, response)
        );
      }
    );
  });

  const unknownStatusCodes = Array(100)
    .fill(0)
    .map((_, i) => i + 400)
    .filter(i => i > 451);

  it.each(unknownStatusCodes)(
    'should fallback on ServerError on unknown status code',
    status => {
      const request: FetchRequest = 'https://test.local';
      const response = new Response('', {status});
      expect(() => serverError(request, response)).toThrow(
        new ServerError('A server error occurred.', request, response)
      );
    }
  );
});

function exceptionMap(): [
  statusCode: number,
  factor: (request: FetchRequest, response: Response) => ServerError
][] {
  return [
    [500, (i, o) => new InternalServerError('Internal Server Error', i, o)],
    [501, (i, o) => new NotImplemented('Not Implemented', i, o)],
    [502, (i, o) => new BadGateway('Bad Gateway', i, o)],
    [503, (i, o) => new ServiceUnavailable('Service Unavailable', i, o)],
    [504, (i, o) => new GatewayTimeout('Gateway Timeout', i, o)],
    [
      505,
      (i, o) => new HTTPVersionNotSupported('HTTP Version Not Supported', i, o),
    ],
    [506, (i, o) => new VariantAlsoNegotiates('Variant Also Negotiates', i, o)],
    [507, (i, o) => new InsufficientStorage('Insufficient Storage', i, o)],
    [508, (i, o) => new LoopDetected('Loop Detected', i, o)],
    [510, (i, o) => new NotExtended('Not Extended', i, o)],
    [
      511,
      (i, o) =>
        new NetworkAuthenticationRequired(
          'Network Authentication Required',
          i,
          o
        ),
    ],
  ];
}
