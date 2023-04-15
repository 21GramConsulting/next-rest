import permute from '!permute';

describe('permute', () => {
  it('should return an empty array when no parameters given', () => {
    expect(permute()).toEqual([]);
  });

  it('should return the same array when only one parameter given', () => {
    expect(permute([1])).toEqual([[1]]);
  });

  it('should return the permutations of values.', () => {
    expect(permute([1], [2])).toEqual([[1, 2]]);
    expect(permute([1, 2], [2])).toContainEqual([1, 2]);
    expect(permute([1, 2], [2])).toContainEqual([2, 2]);
    expect(permute([1, 2], [2, 4])).toContainEqual([1, 2]);
    expect(permute([1, 2], [2, 4])).toContainEqual([1, 4]);
    expect(permute([1, 2], [2, 4])).toContainEqual([2, 2]);
    expect(permute([1, 2], [2, 4])).toContainEqual([2, 4]);

    expect(permute([1, 2], [2, 4], [8, 16, 32])).toContainEqual([1, 2, 8]);
    expect(permute([1, 2], [2, 4], [8, 16, 32])).toContainEqual([1, 2, 16]);
    expect(permute([1, 2], [2, 4], [8, 16, 32])).toContainEqual([1, 2, 32]);

    expect(permute([1, 2], [2, 4], [8, 16, 32])).toContainEqual([1, 4, 8]);
    expect(permute([1, 2], [2, 4], [8, 16, 32])).toContainEqual([1, 4, 16]);
    expect(permute([1, 2], [2, 4], [8, 16, 32])).toContainEqual([1, 4, 32]);

    expect(permute([1, 2], [2, 4], [8, 16, 32])).toContainEqual([2, 2, 8]);
    expect(permute([1, 2], [2, 4], [8, 16, 32])).toContainEqual([2, 2, 16]);
    expect(permute([1, 2], [2, 4], [8, 16, 32])).toContainEqual([2, 2, 32]);
    expect(permute([1, 2], [2, 4], [8, 16, 32])).toContainEqual([2, 4, 8]);
    expect(permute([1, 2], [2, 4], [8, 16, 32])).toContainEqual([2, 4, 16]);
    expect(permute([1, 2], [2, 4], [8, 16, 32])).toContainEqual([2, 4, 32]);
  });
});
