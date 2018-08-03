import { createToken } from "chevrotain";

export const IDENTIFIER = createToken({
  name: "IDENTIFIER",
  pattern: /([a-zA-Z$_])([$_\w])*/,
});

export const DOUBLE = createToken({
  name: "DOUBLE",
  pattern: /\d+\.\d+/,
});

export const INTEGER = createToken({
  name: "INTEGER",
  pattern: /\d+/,
  longer_alt: DOUBLE,
});

export const STRING = createToken({
  name: "STRING",
  pattern: /".*"/,
});

export const LITERALS = [IDENTIFIER, DOUBLE, INTEGER, STRING];
