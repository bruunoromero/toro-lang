import { createToken } from "chevrotain";

import { IDENTIFIER } from "./literals";

export const OF = createToken({
  pattern: /of/,
  name: "OF",
  longer_alt: IDENTIFIER,
});

export const DEF = createToken({
  pattern: /def/,
  name: "DEF",
  longer_alt: IDENTIFIER,
});

export const IMPORT = createToken({
  pattern: /import/,
  name: "IMPORT",
  longer_alt: IDENTIFIER,
});

export const IF = createToken({
  pattern: /if/,
  name: "IF",
  longer_alt: IDENTIFIER,
});

export const ELSE = createToken({
  pattern: /else/,
  name: "ELSE",
  longer_alt: IDENTIFIER,
});

export const MATCH = createToken({
  pattern: /match/,
  name: "MATCH",
  longer_alt: IDENTIFIER,
});

export const TYPE = createToken({
  pattern: /type/,
  name: "TYPE",
  longer_alt: IDENTIFIER,
});

export const EXPORT = createToken({
  pattern: /export/,
  name: "EXPORT",
  longer_alt: IDENTIFIER,
});

export const ALIAS = createToken({
  pattern: /alias/,
  name: "ALIAS",
  longer_alt: IDENTIFIER,
});

export const KEYWORDS = [OF, DEF, IMPORT, IF, ELSE, MATCH, TYPE, EXPORT, ALIAS];
