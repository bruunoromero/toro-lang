import { createToken, Lexer } from "chevrotain";

export const PRECEDENCE1 = createToken({
  name: "PRECEDENCE1",
  pattern: Lexer.NA,
});

export const PRECEDENCE2 = createToken({
  name: "PRECEDENCE2",
  pattern: Lexer.NA,
});

export const DOT = createToken({
  pattern: /\./,
  name: "DOT",
});

export const EQUALS_EQUALS = createToken({
  pattern: /==/,
  name: "EQUALS_EQUALS",
});

export const EQUALS = createToken({
  pattern: /=/,
  name: "EQUALS",
});

export const TIMES_TIMES = createToken({
  pattern: /\*\*/,
  name: "TIMES_TIMES",
});

export const TIMES = createToken({
  pattern: /\*/,
  name: "TIMES",
  categories: PRECEDENCE2,
});

export const SLASH = createToken({
  pattern: /\//,
  name: "SLASH",
  categories: PRECEDENCE2,
});

export const PLUS_PLUS = createToken({
  pattern: /\+\+/,
  name: "PLUS_PLUS",
});

export const PLUS = createToken({
  name: "PLUS",
  pattern: /\+/,
  categories: PRECEDENCE1,
});

export const MINUS = createToken({
  pattern: /\-/,
  name: "MINUS",
  categories: PRECEDENCE1,
});

export const PERCENT = createToken({
  pattern: /%/,
  name: "PERCENT",
});

export const PIPE_PIPE = createToken({
  pattern: /\|\|/,
  name: "PIPE_PIPE",
});

export const PIPE = createToken({
  pattern: /\|/,
  name: "PIPE",
});

export const AMPERSAND_AMPERSAND = createToken({
  pattern: /&&/,
  name: "AMPERSAND_AMPERSAND",
});

export const AMPERSAND = createToken({
  pattern: /&/,
  name: "AMPERSAND",
});

export const OPERATORS = [
  DOT,
  EQUALS_EQUALS,
  EQUALS,
  TIMES_TIMES,
  TIMES,
  SLASH,
  PRECEDENCE2,
  PLUS_PLUS,
  PLUS,
  MINUS,
  PRECEDENCE1,
  PERCENT,
  PIPE_PIPE,
  PIPE,
  AMPERSAND_AMPERSAND,
  AMPERSAND,
];
