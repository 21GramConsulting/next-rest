/**
 * @summary Convenience type representing the input of the `fetch` API.
 * @description
 * By the conventional contract of the fetch api, the `fetch`
 * function either takes a `RequestInfo` or a `URL`.
 * At the time of this code's birth, there was no convenience type
 * grabbing it.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch#parameters
 * group Convenience
 */
export type FetchRequest = Parameters<typeof fetch>[0];
