import { createToken } from "chevrotain";

import { IDENTIFIER } from "./literals";

export const OF = createToken({
  pattern: /of/,
  name: "OF_KEYWORD",
  longer_alt: IDENTIFIER,
});

export const DEF = createToken({
  pattern: /def/,
  name: "DEF_KEYWORD",
  longer_alt: IDENTIFIER,
});

export const IMPORT = createToken({
  pattern: /import/,
  name: "IMPORT_KEYWORD",
  longer_alt: IDENTIFIER,
});

export const KEYWORDS = [OF, DEF, IMPORT];
