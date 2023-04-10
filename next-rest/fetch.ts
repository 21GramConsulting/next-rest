import assertResponse from '#assertResponse';
import {CancellablePromise} from 'real-cancellable-promise';

export default function (
  input: RequestInfo | URL,
  init?: RequestInit
): CancellablePromise<Response> {
  const abortController = new AbortController();

  const promise = fetch(input, {
    ...init,
    signal: abortController.signal,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
  }).then(response => {
    assertResponse(input, response);
    return response;
  });

  return new CancellablePromise(promise, () => abortController.abort());
}
