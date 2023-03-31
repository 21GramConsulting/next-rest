import { Exception } from '#rest/Exception';
import { Identifiable, Identified } from '#rest/Identifiable';

export type Processing = undefined;
export type NoResult = null;
export type Result<R> = R extends Set<infer Record extends Identified<infer ID>>
  ? Set<Identified<ID> & Record>
  : R extends Identified<infer ID>
    ? R & Identified<ID>
    : never;
export type SuccessfulRemoval = undefined;

// if it's undefined, it's still processing
// if it's null, no results were resolved
export type Output<R> = Processing | NoResult | Result<R> | Exception;
export type Write<R> = (value: R) => Promise<Result<R>>;
export type Remove<R, ID> = (value: R & Identified<ID>) => Promise<SuccessfulRemoval>;

export type Hook<ID, R> = R extends Set<infer Record extends Identifiable<ID>>
  // We're dealing with a record set
  ? [
    output: Output<R>,
    write: Write<Record> & Write<R>,
    remove: Remove<ID, R> & Remove<ID, Record>
  ]
  : R extends Iterable<infer Record>
    // Any iterable that is not a set is invalid for now
    ? never
    // we're dealing with a unary type
    : R extends Identifiable<ID>
      ? [
        output: Output<R>,
        write: Write<R> & Write<Set<R>>,
        Remove: Remove<R, ID> & Remove<Set<R>, ID>,
      ]
      // only identifiables bruh...
      : never;

export const isProcessing = <R, ID>(v: Output<R>): v is Processing => v === undefined;
export const isNoResult = <R, ID>(v: Output<R>): v is NoResult => v === null;
export const isException = <R, ID>(v: Output<R>): v is Exception => v instanceof Exception;
export const isResult = <R, ID>(v: Output<R>): v is Result<R> => !isProcessing(v) && !isNoResult(v) && !isException(v);
