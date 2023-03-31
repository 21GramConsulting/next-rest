import {assertResponse} from '#hook/assertResponse/assertResponse';
import {RawData} from '#codec/Codec';

// in this particular case it would defeat elegance.
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<RawData> {
  return fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    assertResponse(input, response);
    return response.text();
  });
}
