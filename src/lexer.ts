import * as moo from "moo";

export const lexer = moo.compile({
  /** OPERATORS */

  PIPE: /\|>/,
  AND: /&&/,
  OR: /\|\|/,
  LTEQ: /<=/,
  GTEQ: />=/,
  LT: /</,
  GT: />/,
  EQUALS: /==/,
  NOT_EQUALS: /!=/,
  ASSIGN: /=/,
  NEGATE: /!/,
  CONCAT: /\+\+/,
  PLUS: /\+/,
  MINUS: /\-/,

  /** SPECIALS */

  DOT: /\./,
  COMMA: /,/,
  COLON: /:/,
  WS: /[ \t]+/,
  LPAREN: /\(/,
  RPAREN: /\)/,
  LBRACE: /\[/,
  RBRACE: /\]/,
  LCURLY: /\{/,
  RCURLY: /\}/,
  SEMI_COLON: /;/,
  NL: { match: /\n+/, lineBreaks: true },

  /** PRIMITIVES */

  INTEGER: /0|[1-9][0-9]*/,
  DOUBLE: /(?:(?:0|[1-9][0-9]*)?\.[0-9]+)/,
  CHAR: { match: /'.'/, value: x => x.slice(1, -1) },
  STRING: { match: /".*"/, value: x => x.slice(1, -1) },

  /** KEYWORDS/IDENTIFIER */

  IDENTIFIER: {
    match: /[a-zA-Z]+/,
    keywords: {
      IF: "if",
      DEF: "def",
      TYPE: "type",
      TRUE: "true",
      ELSE: "else",
      FALSE: "false",
      IMPORT: "import",
      EXPORT: "export",
    },
  },
});
