export type Identifier<T> = T extends string
  ? T
  : never;
