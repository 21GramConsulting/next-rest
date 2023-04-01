/**
 * @summary HTTP methods supported by the `next-rest` library.
 */
export type HttpMethod = (typeof httpMethods)[number];

/**
 * @summary
 * Runtime list of HTTP methods supported by the `next-rest`
 * library.
 * @description
 * This list is useful for validations and type guards motly
 * but not exclusively.
 * @internal
 */
export const httpMethods = ['GET', 'POST', 'PUT', 'DELETE'] as const;

/**
 * @summary Tells whether the provided string is a valid HTTP method.
 * @param method The string to test.
 * @returns `true` if the provided string is a valid HTTP method.
 */
export const isHttpMethod = (method: string): method is HttpMethod =>
  httpMethods.includes(method as HttpMethod);
