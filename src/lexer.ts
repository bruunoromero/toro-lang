import * as moo from "moo";

export const lexer = moo.compile({
  /** SPECIALS */

  DOT: /\./,
  COMMA: /,/,
  COLON: /:/,
  LANGLE: /</,
  RANGLE: />/,
  WS: /[ \t]+/,
  LPAREN: /\(/,
  RPAREN: /\)/,
  LBRACE: /\[/,
  RBRACE: /\]/,
  LCURLY: /\{/,
  RCURLY: /\}/,
  SEMI_COLON: /;/,
  NL: { match: /\n+/, lineBreaks: true },

  /** OPERATORS */

  AND: /&&/,
  OR: /\|\|/,
  PIPE: /\|/,
  PLUS: /\+/,
  MINUS: /\-/,
  EQUALS: /=/,

  /** PRIMITIVES */

  INTEGER: /0|[1-9][0-9]*/,
  STRING: /"(?:\\["\\]|[^\n"\\])*"/,

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
