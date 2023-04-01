import {isHttpMethod, httpMethods} from '#Methods';

describe('Methods.ts', () => {
  describe('.isHttpMethod()', () => {
    test.each(httpMethods)('Candidate %s', candidate => {
      expect(isHttpMethod(candidate)).toBe(true);
    });
    test.each(['asdf', 'qwer', 'yxcv'])('candidate: %s', candidate => {
      expect(isHttpMethod(candidate)).toBe(false);
    });
  });
});
