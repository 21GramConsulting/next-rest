import combine from '!combine';

describe('combine', () => {
  it('should return an empty array when no parameters given', () => {
    expect(combine()).toEqual([]);
  });

  it('should return the same array when only one parameter given', () => {
    const array = [{a: 1}];
    expect(combine(...array)).toEqual(array);
  });

  it('should generate all combinations of two given objects', () => {
    expect(combine({a: 1}, {b: 2})).toContainEqual({a: 1, b: 2});
    expect(combine({a: 1}, {b: 2})).toContainEqual({a: 1});
    expect(combine({a: 1}, {b: 2})).toContainEqual({b: 2});

    expect(combine({a: 1}, {b: 2, c: 3})).toContainEqual({a: 1, b: 2, c: 3});
    expect(combine({a: 1}, {b: 2, c: 3})).toContainEqual({a: 1});
    expect(combine({a: 1}, {b: 2, c: 3})).toContainEqual({b: 2, c: 3});
  });

  it('should generate all combinations of three given objects', () => {
    expect(combine({a: 1}, {b: 2}, {c: 3})).toContainEqual({a: 1, b: 2, c: 3});
    expect(combine({a: 1}, {b: 2}, {c: 3})).toContainEqual({a: 1});
    expect(combine({a: 1}, {b: 2}, {c: 3})).toContainEqual({b: 2});
    expect(combine({a: 1}, {b: 2}, {c: 3})).toContainEqual({c: 3});
    expect(combine({a: 1}, {b: 2}, {c: 3})).toContainEqual({b: 2, c: 3});
    expect(combine({a: 1}, {b: 2}, {c: 3})).toContainEqual({a: 1, c: 3});
    expect(combine({a: 1}, {b: 2}, {c: 3})).toContainEqual({a: 1, b: 2});
  });

  it('should return the same array when only one parameter given', () => {
    const array = [[1]];
    expect(combine(...array)).toEqual(array);
  });

  it('should generate all combinations of two given arrays.', () => {
    expect(combine([1], [2])).toContainEqual([1, 2]);
    expect(combine([1], [2])).toContainEqual([1]);
    expect(combine([1], [2])).toContainEqual([2]);

    expect(combine([1], [2, 3])).toContainEqual([1, 2, 3]);
    expect(combine([1], [2, 3])).toContainEqual([1]);
    expect(combine([1], [2, 3])).toContainEqual([2, 3]);
  });

  it('should generate all combinations of three given arrays.', () => {
    expect(combine([1], [2], [3])).toContainEqual([1, 2, 3]);
    expect(combine([1], [2], [3])).toContainEqual([1]);
    expect(combine([1], [2], [3])).toContainEqual([2]);
    expect(combine([1], [2], [3])).toContainEqual([3]);
    expect(combine([1], [2], [3])).toContainEqual([2, 3]);
    expect(combine([1], [2], [3])).toContainEqual([1, 3]);
    expect(combine([1], [2], [3])).toContainEqual([1, 2]);
  });
});
