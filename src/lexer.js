const moo = require("moo");

const lexer = moo.compile({
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
      DEF: "def",
      IMPORT: "import",
      EXPORT: "export",
    },
  },
});

module.exports = lexer;
