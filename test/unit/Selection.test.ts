import {isSelection, isId, isQuery} from '#Selection';
import {json} from '@21gram-consulting/ts-codec';

describe('Selection', () => {
  const nonQueryable = {endpoint: 'foo', codec: json.string};
  const queryable = {
    endpoint: 'foo',
    codec: json.string,
    query: {test: json.string},
  };
  describe('.isSelection()', () => {
    it('returns true for an id.', () => {
      expect(isSelection('foo', queryable)).toBe(true);
      expect(isSelection('foo', nonQueryable)).toBe(true);
    });
    it('returns true for a query.', () => {
      expect(isSelection({test: 'foo'}, queryable)).toBe(true);
    });
    it('returns false for a non-queryable descriptor.', () => {
      expect(isSelection({test: 'foo'}, nonQueryable)).toBe(false);
    });
    it('returns false for a non-object selection.', () => {
      expect(isSelection(123, queryable)).toBe(false);
      expect(isSelection(false, queryable)).toBe(false);
      expect(isSelection(() => {}, queryable)).toBe(false);
    });
    it('returns false for a null selection.', () => {
      expect(isSelection(null, queryable)).toBe(false);
    });
    it('returns false for a selection with an invalid key.', () => {
      expect(isSelection({foo: 'bar'}, queryable)).toBe(false);
    });
  });

  describe('.isId()', () => {
    it('returns true for an id.', () => {
      expect(isId('foo')).toBe(true);
    });
    it.each([[undefined], [null], [true], [false], [{}], [[]], [() => {}]])(
      'returns false for a non-id.',
      v => expect(isId(v)).toBe(false)
    );
  });

  describe('.isQuery()', () => {
    it('returns false for a non-queryable descriptor.', () => {
      expect(isQuery({}, nonQueryable)).toBe(false);
    });
    it('returns false for a non-object selection.', () => {
      expect(isQuery('foo', queryable)).toBe(false);
      expect(isQuery(123, queryable)).toBe(false);
      expect(isQuery(false, queryable)).toBe(false);
      expect(isQuery(() => {}, queryable)).toBe(false);
    });
    it('returns false for a null selection.', () => {
      expect(isQuery(null, queryable)).toBe(false);
    });
    it('returns false for a selection with an invalid key.', () => {
      expect(isQuery({foo: 'bar'}, queryable)).toBe(false);
    });
    it('returns true for a valid selection.', () => {
      expect(isQuery({test: 'foo'}, queryable)).toBe(true);
    });
  });
});
