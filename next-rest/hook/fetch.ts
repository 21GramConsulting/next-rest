import assertResponse from '#hook/assertResponse';
import {RawData} from '@21gram-consulting/ts-codec';

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
