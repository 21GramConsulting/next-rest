import fetch from '#fetch';

describe('fetch', () => {
  let originalFetch = global.fetch;
  beforeEach(() => (originalFetch = global.fetch));
  afterEach(() => (global.fetch = originalFetch));

  it('should pass the input unaltered when string.', () => {
    const mockFetch = jest.fn().mockReturnValue({
      then: jest.fn(),
    });
    global.fetch = mockFetch;
    fetch('http://localhost:3000');
    expect(mockFetch.mock.calls[0][0]).toBe('http://localhost:3000');
  });
  it('should pass the input unaltered when URL.', () => {
    const mockFetch = jest.fn().mockReturnValue({
      then: jest.fn(),
    });
    global.fetch = mockFetch;
    const url = new URL('http://localhost:3000');
    fetch(url);
    expect(mockFetch.mock.calls[0][0]).toBe(url);
    expect(url).toEqual(new URL('http://localhost:3000'));
  });
  it('should pass the input unaltered when Request.', () => {
    const mockFetch = jest.fn().mockReturnValue({
      then: jest.fn(),
    });
    global.fetch = mockFetch;
    const request = new Request('http://localhost:3000');
    fetch(request);
    expect(mockFetch.mock.calls[0][0]).toBe(request);
    expect(request).toEqual(new Request('http://localhost:3000'));
  });

  it('should create a RequestInit when not provided.', () => {
    const mockFetch = jest.fn().mockReturnValue({
      then: jest.fn(),
    });
    global.fetch = mockFetch;
    fetch('http://localhost:3000');
    expect(mockFetch.mock.calls[0][1]).toEqual({
      headers: {'Content-Type': 'application/json'},
    });
  });

  it('should extend the RequestInit when provided.', () => {
    const mockFetch = jest.fn().mockReturnValue({
      then: jest.fn(),
    });
    global.fetch = mockFetch;
    fetch('http://localhost:3000', {
      headers: {'X-Test': 'test'},
    });
    expect(mockFetch.mock.calls[0][1]).toEqual({
      headers: {'Content-Type': 'application/json', 'X-Test': 'test'},
    });
  });

  it('should override the Content-Type when provided.', () => {
    const mockFetch = jest.fn().mockReturnValue({
      then: jest.fn(),
    });
    global.fetch = mockFetch;
    fetch('http://localhost:3000', {
      headers: {'Content-Type': 'text/plain'},
    });
    expect(mockFetch.mock.calls[0][1]).toEqual({
      headers: {'Content-Type': 'application/json'},
    });
  });
});
