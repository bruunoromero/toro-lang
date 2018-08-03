import { createToken, Lexer } from "chevrotain";

export const WS = createToken({
  pattern: /\s+/,
  name: "WHITE_SPACE",
  group: Lexer.SKIPPED,
});

export const LCURLY = createToken({
  pattern: /{/,
  name: "LEFT_CURLY",
});

export const RCURLY = createToken({
  pattern: /}/,
  name: "RIGHT_CURLY",
});

export const LBRACE = createToken({
  pattern: /\[/,
  name: "LEFT_BRACE",
});

export const RBRACE = createToken({
  pattern: /\]/,
  name: "RIGHT_BRACE",
});

export const LPAREN = createToken({
  pattern: /\(/,
  name: "LEFT_PAREN",
});

export const RPAREN = createToken({
  pattern: /\)/,
  name: "RIGHT_PAREN",
});

export const COLON = createToken({
  pattern: /:/,
  name: "COLON",
});

export const EQUAL = createToken({
  pattern: /=/,
  name: "EQUAL",
});

export const SPECIALS = [
  WS,
  EQUAL,
  LCURLY,
  RCURLY,
  LBRACE,
  RBRACE,
  LPAREN,
  RPAREN,
];
