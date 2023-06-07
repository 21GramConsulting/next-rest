/**
 * @packageDocumentation
 * @summary
 * Provides the primary `next-rest` API.
 */

export {default as Exception} from './Exception';
export * from './FetchRequest';
export * from './Identifiable';
export * from './Identifier';
export * from './connector';
export * from './ClientDescriptor';

export * from './description';

export * from './handler';
export * from './handlers/CreateHandler';
export * from './handlers/DeleteHandler';
export * from './handlers/ReadHandler';
export * from './handlers/UpdateHandler';

export * from './hook';

export * as exceptions from './exceptions';
