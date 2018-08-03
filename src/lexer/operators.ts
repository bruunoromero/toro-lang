import { createToken } from "chevrotain";

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
  longer_alt: EQUALS_EQUALS,
});

export const TIMES_TIMES = createToken({
  pattern: /\*\*/,
  name: "TIMES_TIMES",
});

export const TIMES = createToken({
  pattern: /\*/,
  name: "TIMES",
  longer_alt: TIMES_TIMES,
});

export const PLUS_PLUS = createToken({
  pattern: /\+\+/,
  name: "PLUS_PLUS",
});

export const PLUS = createToken({
  pattern: /\+/,
  name: "PLUS",
  longer_alt: PLUS_PLUS,
});

export const MINUS = createToken({
  pattern: /\-/,
  name: "MINUS",
});

export const SLASH = createToken({
  pattern: /\//,
  name: "SLASH",
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
  longer_alt: PIPE_PIPE,
});

export const AMPERSAND_AMPERSAND = createToken({
  pattern: /&&/,
  name: "AMPERSAND_AMPERSAND",
});

export const AMPERSAND = createToken({
  pattern: /&/,
  name: "AMPERSAND",
  longer_alt: AMPERSAND_AMPERSAND,
});

export const OPERATORS = [
  PERIOD,
  EQUALS_EQUALS,
  EQUALS,
  TIMES_TIMES,
  TIMES,
  PLUS_PLUS,
  PLUS,
  MINUS,
  SLASH,
  PERCENT,
  PIPE_PIPE,
  PIPE,
  AMPERSAND_AMPERSAND,
  AMPERSAND,
];
