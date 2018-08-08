import { createToken, Lexer } from "chevrotain";

export const WHITE_SPACE = createToken({
  pattern: /\s+/,
  name: "WHITE_SPACE",
  group: Lexer.SKIPPED,
  line_breaks: true,
});

export const COMMENT = createToken({
  pattern: /#.*/,
  name: "COMMENT",
  group: Lexer.SKIPPED,
});

export const LCURLY = createToken({
  pattern: /{/,
  name: "LCURLY",
});

export const RCURLY = createToken({
  pattern: /}/,
  name: "RCURLY",
});

export const LBRACE = createToken({
  pattern: /\[/,
  name: "LBRACE",
});

export const RBRACE = createToken({
  pattern: /\]/,
  name: "RBRACE",
});

export const LPAREN = createToken({
  pattern: /\(/,
  name: "LPAREN",
});

export const RPAREN = createToken({
  pattern: /\)/,
  name: "RPAREN",
});

export const LT = createToken({
  pattern: /\</,
  name: "LT",
});

export const RT = createToken({
  pattern: /\>/,
  name: "RT",
});

export const COLON = createToken({
  pattern: /:/,
  name: "COLON",
});

export const SEMI_COLON = createToken({
  pattern: /;/,
  name: "SEMI_COLON",
});

export const COMMA = createToken({
  pattern: /,/,
  name: "COMMA",
});

export const ARROW = createToken({
  pattern: /->/,
  name: "ARROW",
});

export const FAT_ARROW = createToken({
  pattern: /=>/,
  name: "FAT_ARROW",
});

export const SPECIALS = [
  LT,
  RT,
  WHITE_SPACE,
  COMMENT,
  ARROW,
  FAT_ARROW,
  COMMA,
  COLON,
  SEMI_COLON,
  LCURLY,
  RCURLY,
  LBRACE,
  RBRACE,
  LPAREN,
  RPAREN,
];
