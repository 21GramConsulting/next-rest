import {sep as DIRECTORY_SEPARATOR} from 'path';

/**
 * @summary
 * Returns the API endpoint for a Next.js API route.
 * @description
 * This function is used to determine the API endpoint for a
 * Next.js API route.
 * It is used by the `createHook` function to determine the
 * appropriate endpoint for a given API route, based on the
 * import meta URL of the file representing the API route, or
 * the import meta URL of the REST resource endpoint.
 * @param importMetaUrl - The import meta URL of the file
 * @returns The API endpoint for the given Next.js API route
 * @example
 * Primitive example:
 * ```ts
 * import {nextJsApiEndpointFrom} from '@21gram-consulting/next-rest';
 * const endpoint = nextJsApiEndpointFrom(import.meta.url);
 * ```
 * @group Convenience API
 */
export const nextJsApiEndpointFrom = (importMetaUrl: string) => {
  const apiDirectory = ['pages', 'api'].join(DIRECTORY_SEPARATOR);
  const baseValue: string = importMetaUrl.split(apiDirectory).pop() ?? '';
  let path: string;
  if (baseValue.endsWith('/index.api.ts')) {
    path = baseValue.replace(/\/index\.api\.ts$/, '');
  } else if (baseValue.endsWith('.api.ts')) {
    path = baseValue.replace(/\.api\.ts$/, '');
  } else {
    path = baseValue.split('/').slice(0, -1).join('/');
  }
  return '/api'.concat(path);
};
