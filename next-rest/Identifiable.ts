import {Identifier} from '#Identifier';

export type Identifiable<ID> = Identified<ID> | Unidentified<ID>;
export type Identified<ID> = {id: Identifier<ID>;};
export type Unidentified<ID> = {id?: Identifier<ID> | undefined;};

export const isIdentified = <ID>(
  record: Identifiable<ID>
): record is Identified<ID> => record.id !== undefined;
export const isUnidentified = <ID>(
  record: Identifiable<ID>
): record is Unidentified<ID> => record.id === undefined;
