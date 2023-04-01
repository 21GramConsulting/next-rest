import {ClientError} from '#exceptions/ResponseException/ClientError/ClientError';

/**
 * @summary Represents a 416 Range Not Satisfiable.
 * @description
 * The client has asked for a portion of the file (byte
 * serving), but the server cannot supply that portion. For
 * example, if the client asked for a part of the file that
 * lies beyond the end of the file. Called "Requested Range
 * Not Satisfiable" previously RFC 2616.
 * @group HTTP Response Exceptions: 4xx Client Error
 */
export class RangeNotSatisfiable extends ClientError { }
