/**
 * @summary Represents the identifier of a REST resource.
 * @description
 * This weirdo type makes sure that the identifier of a
 * REST resource is a `string` but keeps the door open for
 * more strongly typed identifiers.
 * @example
 * The most basic "untyped" string example:
 * ```ts
 * // This is a valid identifier
 * const id: Identifier<string> = 'foo';
 * // This is not a valid identifier
 * const id: Identifier<string> = 42;
 * ```
 * @example
 * A more advanced, typed example:
 * ```ts
 * type ServiceID = 'auth' | 'paymentGateway' | 'cms' | 'crm';
 * // This is a valid identifier
 * const healthCheckId: Identifier<ServiceID> = 'auth';
 * // This is not a valid identifier
 * const healthCheckId: ServiceID = 'foo';
 * ```
 * @group Core API
 */
export type Identifier<T> = T extends string ? T : never;
