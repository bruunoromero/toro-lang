import * as moo from "moo";

export const lexer = moo.compile({
  /** OPERATORS */

  PIPE: /\|>/,
  AND: /&&/,
  OR: /\|\|/,
  BOR: /\|/,
  ARROW: /->/,
  FAT_ARROW: /=>/,
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
    match: /[a-zA-Z_$]+/,
    keywords: {
      AS: "as",
      IF: "if",
      DEF: "def",
      LET: "let",
      TYPE: "type",
      ELSE: "else",
      MATCH: "match",
      IMPORT: "import",
      EXPORT: "export",
    },
  },
});
