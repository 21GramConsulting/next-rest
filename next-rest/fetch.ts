import assertResponse from '#assertResponse';

export default async function (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  return fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  }).then(response => {
    assertResponse(input, response);
    return response;
  });
}
