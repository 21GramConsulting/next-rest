import { FetchRequest } from '#rest/FetchRequest';
import { ClientError } from '#rest/exceptions/ResponseException/ClientError';
import { BadRequest } from '#rest/exceptions/ResponseException/ClientError/BadRequest';
import { PaymentRequired } from '#rest/exceptions/ResponseException/ClientError/PaymentRequired';
import { Forbidden } from '#rest/exceptions/ResponseException/ClientError/Forbidden';
import { NotFound } from '#rest/exceptions/ResponseException/ClientError/NotFound';
import { MethodNotAllowed } from '#rest/exceptions/ResponseException/ClientError/MethodNotAllowed';
import { NotAcceptable } from '#rest/exceptions/ResponseException/ClientError/NotAcceptable';
import {
  ProxyAuthenticationRequired,
} from '#rest/exceptions/ResponseException/ClientError/ProxyAuthenticationRequired';
import { RequestTimeout } from '#rest/exceptions/ResponseException/ClientError/RequestTimeout';
import { Conflict } from '#rest/exceptions/ResponseException/ClientError/Conflict';
import { Gone } from '#rest/exceptions/ResponseException/ClientError/Gone';
import { LengthRequired } from '#rest/exceptions/ResponseException/ClientError/LengthRequired';
import { PreconditionFailed } from '#rest/exceptions/ResponseException/ClientError/PreconditionFailed';
import { PayloadTooLarge } from '#rest/exceptions/ResponseException/ClientError/PayloadTooLarge';
import { URITooLong } from '#rest/exceptions/ResponseException/ClientError/URITooLong';
import { UnsupportedMediaType } from '#rest/exceptions/ResponseException/ClientError/UnsupportedMediaType';
import { RangeNotSatisfiable } from '#rest/exceptions/ResponseException/ClientError/RangeNotSatisfiable';
import { ExpectationFailed } from '#rest/exceptions/ResponseException/ClientError/ExpectationFailed';
import { Teapot } from '#rest/exceptions/ResponseException/ClientError/Teapot';
import { MisdirectedRequest } from '#rest/exceptions/ResponseException/ClientError/MisdirectedRequest';
import { UnprocessableEntity } from '#rest/exceptions/ResponseException/ClientError/UnprocessableEntity';
import { Locked } from '#rest/exceptions/ResponseException/ClientError/Locked';
import { FailedDependency } from '#rest/exceptions/ResponseException/ClientError/FailedDependency';
import { TooEarly } from '#rest/exceptions/ResponseException/ClientError/TooEarly';
import { UpgradeRequired } from '#rest/exceptions/ResponseException/ClientError/UpgradeRequired';
import { PreconditionRequired } from '#rest/exceptions/ResponseException/ClientError/PreconditionRequired';
import { TooManyRequests } from '#rest/exceptions/ResponseException/ClientError/TooManyRequests';
import {
  RequestHeaderFieldsTooLarge,
} from '#rest/exceptions/ResponseException/ClientError/RequestHeaderFieldsTooLarge';
import { UnavailableForLegalReasons } from '#rest/exceptions/ResponseException/ClientError/UnavailableForLegalReasons';
import { Unauthorized } from '#rest/exceptions/ResponseException/ClientError/Unauthorized';

export const clientError = (request: FetchRequest, response: Response) => {
  // @formatter:off
  switch (Math.floor(response.status % 100)) {
    case 0: throw new BadRequest(`Bad Request`, request, response);
    case 1: throw new Unauthorized(`Unauthorized`, request, response);
    case 2: throw new PaymentRequired(`Payment Required`, request, response);
    case 3: throw new Forbidden(`Forbidden`, request, response);
    case 4: throw new NotFound(`Not Found`, request, response);
    case 5: throw new MethodNotAllowed(`Method Not Allowed`, request, response);
    case 6: throw new NotAcceptable(`Not Acceptable`, request, response);
    case 7: throw new ProxyAuthenticationRequired(`Proxy Authentication Required`, request, response);
    case 8: throw new RequestTimeout(`Request Timeout`, request, response);
    case 9: throw new Conflict(`Conflict`, request, response);
    case 10: throw new Gone(`Gone`, request, response);
    case 11: throw new LengthRequired(`Length Required`, request, response);
    case 12: throw new PreconditionFailed(`Precondition Failed`, request, response);
    case 13: throw new PayloadTooLarge(`Payload Too Large`, request, response);
    case 14: throw new URITooLong(`URI Too Long`, request, response);
    case 15: throw new UnsupportedMediaType(`Unsupported Media Type`, request, response);
    case 16: throw new RangeNotSatisfiable(`Range Not Satisfiable`, request, response);
    case 17: throw new ExpectationFailed(`Expectation Failed`, request, response);
    case 18: throw new Teapot(`I'm a teapot`, request, response);
    case 21: throw new MisdirectedRequest(`Misdirected Request`, request, response);
    case 22: throw new UnprocessableEntity(`Unprocessable Entity`, request, response);
    case 23: throw new Locked(`Locked`, request, response);
    case 24: throw new FailedDependency(`Failed Dependency`, request, response);
    case 25: throw new TooEarly(`Too Early`, request, response);
    case 26: throw new UpgradeRequired(`Upgrade Required`, request, response);
    case 28: throw new PreconditionRequired(`Precondition Required`, request, response);
    case 29: throw new TooManyRequests(`Too Many Requests`, request, response);
    case 31: throw new RequestHeaderFieldsTooLarge(`Request Header Fields Too Large`, request, response);
    case 51: throw new UnavailableForLegalReasons(`Unavailable For Legal Reasons`, request, response);
    default: throw new ClientError(`A client error occurred.`, request, response,);
  }
  // @formatter:on
};
