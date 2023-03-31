import {hello} from '#hello';

describe('Hello', () => {
  it('should return hello world', () => {
    expect(hello('world')).toBe('Hello world!');
  });
});
