import {clientError} from '#assertResponse/clientError';
import ClientError from '#exceptions/ResponseException/ClientError/ClientError';
import BadRequest from '#exceptions/ResponseException/ClientError/BadRequest';
import PaymentRequired from '#exceptions/ResponseException/ClientError/PaymentRequired';
import Forbidden from '#exceptions/ResponseException/ClientError/Forbidden';
import NotFound from '#exceptions/ResponseException/ClientError/NotFound';
import MethodNotAllowed from '#exceptions/ResponseException/ClientError/MethodNotAllowed';
import NotAcceptable from '#exceptions/ResponseException/ClientError/NotAcceptable';
import ProxyAuthenticationRequired from '#exceptions/ResponseException/ClientError/ProxyAuthenticationRequired';
import RequestTimeout from '#exceptions/ResponseException/ClientError/RequestTimeout';
import Conflict from '#exceptions/ResponseException/ClientError/Conflict';
import Gone from '#exceptions/ResponseException/ClientError/Gone';
import LengthRequired from '#exceptions/ResponseException/ClientError/LengthRequired';
import PreconditionFailed from '#exceptions/ResponseException/ClientError/PreconditionFailed';
import PayloadTooLarge from '#exceptions/ResponseException/ClientError/PayloadTooLarge';
import URITooLong from '#exceptions/ResponseException/ClientError/URITooLong';
import UnsupportedMediaType from '#exceptions/ResponseException/ClientError/UnsupportedMediaType';
import RangeNotSatisfiable from '#exceptions/ResponseException/ClientError/RangeNotSatisfiable';
import ExpectationFailed from '#exceptions/ResponseException/ClientError/ExpectationFailed';
import Teapot from '#exceptions/ResponseException/ClientError/Teapot';
import MisdirectedRequest from '#exceptions/ResponseException/ClientError/MisdirectedRequest';
import UnprocessableEntity from '#exceptions/ResponseException/ClientError/UnprocessableEntity';
import Locked from '#exceptions/ResponseException/ClientError/Locked';
import FailedDependency from '#exceptions/ResponseException/ClientError/FailedDependency';
import TooEarly from '#exceptions/ResponseException/ClientError/TooEarly';
import UpgradeRequired from '#exceptions/ResponseException/ClientError/UpgradeRequired';
import PreconditionRequired from '#exceptions/ResponseException/ClientError/PreconditionRequired';
import TooManyRequests from '#exceptions/ResponseException/ClientError/TooManyRequests';
import RequestHeaderFieldsTooLarge from '#exceptions/ResponseException/ClientError/RequestHeaderFieldsTooLarge';
import UnavailableForLegalReasons from '#exceptions/ResponseException/ClientError/UnavailableForLegalReasons';
import Unauthorized from '#exceptions/ResponseException/ClientError/Unauthorized';
import {FetchRequest} from '#FetchRequest';

describe('clientError', () => {
  describe('on known status code', () => {
    it.each(exceptionMap())(
      'should throw %d related exception.',
      (status, factory) => {
        const request: FetchRequest = 'https://test.local';
        const response = new Response('', {status});
        expect(() => clientError(request, response)).toThrow(
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
    'should fallback on ClientError on unknown status code',
    status => {
      const request: FetchRequest = 'https://test.local';
      const response = new Response('', {status});
      expect(() => clientError(request, response)).toThrow(
        new ClientError('A client error occurred.', request, response)
      );
    }
  );
});

function exceptionMap(): [
  statusCode: number,
  factor: (request: FetchRequest, response: Response) => ClientError
][] {
  return [
    [400, (i, o) => new BadRequest('Bad Request', i, o)],
    [401, (i, o) => new Unauthorized('Unauthorized', i, o)],
    [402, (i, o) => new PaymentRequired('Payment Required', i, o)],
    [403, (i, o) => new Forbidden('Forbidden', i, o)],
    [404, (i, o) => new NotFound('Not Found', i, o)],
    [405, (i, o) => new MethodNotAllowed('Method Not Allowed', i, o)],
    [406, (i, o) => new NotAcceptable('Not Acceptable', i, o)],
    [
      407,
      (i, o) =>
        new ProxyAuthenticationRequired('Proxy Authentication Required', i, o),
    ],
    [408, (i, o) => new RequestTimeout('Request Timeout', i, o)],
    [409, (i, o) => new Conflict('Conflict', i, o)],
    [410, (i, o) => new Gone('Gone', i, o)],
    [411, (i, o) => new LengthRequired('Length Required', i, o)],
    [412, (i, o) => new PreconditionFailed('Precondition Failed', i, o)],
    [413, (i, o) => new PayloadTooLarge('Payload Too Large', i, o)],
    [414, (i, o) => new URITooLong('URI Too Long', i, o)],
    [415, (i, o) => new UnsupportedMediaType('Unsupported Media Type', i, o)],
    [416, (i, o) => new RangeNotSatisfiable('Range Not Satisfiable', i, o)],
    [417, (i, o) => new ExpectationFailed('Expectation Failed', i, o)],
    [418, (i, o) => new Teapot("I'm a teapot", i, o)],
    [421, (i, o) => new MisdirectedRequest('Misdirected Request', i, o)],
    [422, (i, o) => new UnprocessableEntity('Unprocessable Entity', i, o)],
    [423, (i, o) => new Locked('Locked', i, o)],
    [424, (i, o) => new FailedDependency('Failed Dependency', i, o)],
    [425, (i, o) => new TooEarly('Too Early', i, o)],
    [426, (i, o) => new UpgradeRequired('Upgrade Required', i, o)],
    [428, (i, o) => new PreconditionRequired('Precondition Required', i, o)],
    [429, (i, o) => new TooManyRequests('Too Many Requests', i, o)],
    [
      431,
      (i, o) =>
        new RequestHeaderFieldsTooLarge(
          'Request Header Fields Too Large',
          i,
          o
        ),
    ],
    [
      451,
      (i, o) =>
        new UnavailableForLegalReasons('Unavailable For Legal Reasons', i, o),
    ],
  ];
}
