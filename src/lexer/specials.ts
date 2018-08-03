import { createToken, Lexer } from "chevrotain";

export const NEW_LINE = createToken({
  name: "NEW_LINE",
  pattern: /(\r\n|\r|\n)/,
});

export const WS = createToken({
  pattern: /\s+/,
  name: "WHITE_SPACE",
  group: Lexer.SKIPPED,
});

export const COMMENT = createToken({
  pattern: /#.*/,
  name: "COMMENT",
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
  NEW_LINE,
  WS,
  COMMENT,
  ARROW,
  FAT_ARROW,
  COMMA,
  COLON,
  LCURLY,
  RCURLY,
  LBRACE,
  RBRACE,
  LPAREN,
  RPAREN,
];
