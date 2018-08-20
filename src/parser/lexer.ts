import * as moo from "moo";

export const lexer = moo.compile({
  LPAREN: /\(/,
  RPAREN: /\)/,
  LBRACE: /\[/,
  RBRACE: /\]/,
  LCURLY: /\}/,
  RCURLY: /\}/,
  WS: { match: /\s+/, lineBreaks: true },
  NIL: /nil/,
  TRUE: /true/,
  FALSE: /false/,
  STRING: { match: /".*?"/, value: t => t.slice(1, -1) },
  NUMBER: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
  SYMBOL: /:[^ \n]+$/,
  IDENTIFIER: /[^ \n\(\)\[\]\{\}]+/,
});
