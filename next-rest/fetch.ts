import assertResponse from '#assertResponse';

export default async function (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
  }).then(response => {
    assertResponse(input, response);
    return response;
  });
}
