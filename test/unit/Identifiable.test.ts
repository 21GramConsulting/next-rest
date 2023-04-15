import {isIdentified, isUnidentified} from '#Identifiable';

describe('Identifiable', () => {
  describe('.isIdentified()', () => {
    it('returns true for an identified record', () => {
      expect(isIdentified({id: 'foo'})).toBe(true);
    });
    it('returns false for an unidentified record', () => {
      expect(isIdentified({id: undefined})).toBe(false);
    });
  });

  describe('.isUnidentified()', () => {
    it('returns true for an unidentified record', () => {
      expect(isUnidentified({id: undefined})).toBe(true);
    });
    it('returns false for an identified record', () => {
      expect(isUnidentified({id: 'foo'})).toBe(false);
    });
  });
});
