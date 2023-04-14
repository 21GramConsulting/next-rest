import {isHttpMethod} from '#Methods';

describe('Methods.ts', () => {
  describe('.isHttpMethod()', () => {
    it('returns true for a supported HTTP method.', () => {
      expect(isHttpMethod('GET')).toBe(true);
      expect(isHttpMethod('POST')).toBe(true);
      expect(isHttpMethod('PUT')).toBe(true);
      expect(isHttpMethod('DELETE')).toBe(true);
    });
    it('returns false for an unsupported HTTP method.', () => {
      expect(isHttpMethod('PATCH')).toBe(false);
      expect(isHttpMethod('HEAD')).toBe(false);
      expect(isHttpMethod('OPTIONS')).toBe(false);
      expect(isHttpMethod('')).toBe(false);
      expect(isHttpMethod('FOO')).toBe(false);
      expect(isHttpMethod('get')).toBe(false);
      expect(isHttpMethod('post')).toBe(false);
      expect(isHttpMethod('put')).toBe(false);
      expect(isHttpMethod('patch')).toBe(false);
      expect(isHttpMethod('delete')).toBe(false);
      expect(isHttpMethod('head')).toBe(false);
      expect(isHttpMethod('options')).toBe(false);
    });
  });
});
