import { createToken } from "chevrotain";

import { IDENTIFIER } from "./literals";

export const TRUE = createToken({
  pattern: /true/,
  name: "TRUE",
});

export const FALSE = createToken({
  pattern: /false/,
  name: "FALSE",
});

export const DEF = createToken({
  pattern: /def/,
  name: "DEF",
});

export const IMPORT = createToken({
  pattern: /import/,
  name: "IMPORT",
});

export const IF = createToken({
  pattern: /if/,
  name: "IF",
});

export const ELSE = createToken({
  pattern: /else/,
  name: "ELSE",
});

export const MATCH = createToken({
  pattern: /match/,
  name: "MATCH",
});

export const TYPE = createToken({
  pattern: /type/,
  name: "TYPE",
});

export const EXPORT = createToken({
  pattern: /export/,
  name: "EXPORT",
});

export const ALIAS = createToken({
  pattern: /alias/,
  name: "ALIAS",
});

export const KEYWORDS = [
  TRUE,
  FALSE,
  DEF,
  IMPORT,
  IF,
  ELSE,
  MATCH,
  TYPE,
  EXPORT,
  ALIAS,
];
