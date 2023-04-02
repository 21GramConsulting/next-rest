import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 410 Gone.
 * @description
 * Indicates that the resource requested was previously in
 * use but is no longer available and will not be available
 * again. This should be used when a resource has been
 * intentionally removed and the resource should be purged.
 * Upon receiving a 410 status code, the client should not
 * request the resource in the future. Clients such as
 * search engines should remove the resource from their
 * indices. Most use cases do not require clients and
 * search engines to purge the resource, and a "404 Not Found"
 * may be used instead.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class Gone extends ClientError {}
