import Exception from '#Exception';

describe('Exception', () => {
  it('should expose the request & response passed to it', () => {
    const request = new Request('http://example.com');
    const response = new Response('Hello World');
    const exception = new Exception('Hello World', request, response);
    expect(exception.request).toBe(request);
    expect(exception.response).toBe(response);
  });

  it('should assign the message passed to it', () => {
    const request = new Request('http://example.com');
    const response = new Response('Hello World');
    const exception = new Exception('Hello World', request, response);
    expect(exception.message).toBe('Hello World');
  });
});
