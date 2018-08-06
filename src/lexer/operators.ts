import { createToken, Lexer } from "chevrotain";

export const ADDITION_OPERATOR = createToken({
  name: "ADDITION_OPERATOR",
  pattern: Lexer.NA,
});

export const MULTIPLICATION_OPERATOR = createToken({
  name: "MULTIPLICATION_OPERATOR",
  pattern: Lexer.NA,
});

export const PERIOD = createToken({
  pattern: /\./,
  name: "PERIOD",
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
  categories: MULTIPLICATION_OPERATOR,
});

export const SLASH = createToken({
  pattern: /\//,
  name: "SLASH",
  categories: MULTIPLICATION_OPERATOR,
});

export const PLUS_PLUS = createToken({
  pattern: /\+\+/,
  name: "PLUS_PLUS",
});

export const PLUS = createToken({
  name: "PLUS",
  pattern: /\+/,
  categories: ADDITION_OPERATOR,
});

export const MINUS = createToken({
  pattern: /\-/,
  name: "MINUS",
  categories: ADDITION_OPERATOR,
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
  PERIOD,
  EQUALS_EQUALS,
  EQUALS,
  TIMES_TIMES,
  TIMES,
  SLASH,
  MULTIPLICATION_OPERATOR,
  PLUS_PLUS,
  PLUS,
  MINUS,
  ADDITION_OPERATOR,
  PERCENT,
  PIPE_PIPE,
  PIPE,
  AMPERSAND_AMPERSAND,
  AMPERSAND,
];
