import Exception from '#Exception';
import {FetchRequest} from '#FetchRequest';
import assertResponse from '#assertResponse';
import {clientError} from '#assertResponse/clientError';
import {serverError} from '#assertResponse/serverError';

describe('assertResponse', () => {
  describe('1xx', () => {
    it.each(statusCodeRange(1))(
      'should proceed silently when status code is %d.',
      status => {
        const request: FetchRequest = 'https://test.local';
        const response = new Response('', {status});
        expect(() => assertResponse(request, response)).not.toThrow();
      }
    );
  });

  describe('2xx', () => {
    it.each(statusCodeRange(2))(
      'should proceed silently when status code is %d.',
      status => {
        const request: FetchRequest = 'https://test.local';
        const response = new Response('', {status});
        expect(() => assertResponse(request, response)).not.toThrow();
      }
    );
  });

  describe('3xx', () => {
    it.each(statusCodeRange(3))(
      'should proceed silently when status code is %d.',
      status => {
        const request: FetchRequest = 'https://test.local';
        const response = new Response('', {status});
        expect(() => assertResponse(request, response)).not.toThrow();
      }
    );
  });

  describe('4xx', () => {
    it.each(statusCodeRange(4))(
      'should throw expected exception when status code is %d.',
      status => {
        const request: FetchRequest = 'https://test.local';
        const response = new Response('', {status});
        let expectedError: any;
        try {
          clientError(request, response);
        } catch (error) {
          expectedError = error;
        }
        expect(() => assertResponse(request, response)).toThrow(expectedError);
      }
    );
  });

  describe('5xx', () => {
    it.each(statusCodeRange(5))(
      'should throw expected exception when status code is %d.',
      status => {
        const request: FetchRequest = 'https://test.local';
        const response = new Response('', {status});
        let expectedError: any;
        try {
          serverError(request, response);
        } catch (error) {
          expectedError = error;
        }
        expect(() => assertResponse(request, response)).toThrow(expectedError);
      }
    );
  });

  describe('6xx', () => {
    it.each(statusCodeRange(6))(
      'should throw expected exception when status code is a non-standard %d.',
      status => {
        const request: FetchRequest = 'https://test.local';
        const response = new Response('', {status});
        expect(() => assertResponse(request, response)).toThrow(
          new Exception(
            'A non-standard status code was received!',
            request,
            response
          )
        );
      }
    );
  });
});

function statusCodeRange(realm: number): number[] {
  return Array(100)
    .fill(0)
    .map((_, i) => i + realm * 100);
}
