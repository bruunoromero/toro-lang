import { createToken } from "chevrotain";

export const DEF = createToken({
  pattern: /def/,
  name: "DEF_KEYWORD",
});

export const KEYWORDS = [DEF];
