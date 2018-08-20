import * as moo from "moo";

export const lexer = moo.compile({
  NIL: /nil/,
  TRUE: /true/,
  FALSE: /false/,
  LPAREN: /\(/,
  RPAREN: /\)/,
  LBRACE: /\[/,
  RBRACE: /\]/,
  LCURLY: /\}/,
  RCURLY: /\}/,
  COMMENT: /;.*/,
  WS: { match: /\s+/, lineBreaks: true },
  STRING: { match: /".*?"/, value: (t: any) => t.slice(1, -1) },
  SYMBOL: { match: /:[^ \n\(\)\[\]\{\}]+/, value: (t: any) => t.slice(1) },
  IDENTIFIER: {
    match: /[^ \n\(\)\[\]\{\}]+/,
    keywords: {
      FN: "fn",
      DEF: "def",
      DEFMACRO: "defmacro",
      DEFSYNTAX: "defsyntax",
    },
  },
  NUMBER: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
});

lexer.next = (next => () => {
  let tok;
  while (
    // tslint:disable-next-line:no-conditional-assignment
    (tok = next.call(lexer)) &&
    (tok.type === "WS" || tok.type === "COMMENT")
  ) {}
  return tok;
})(lexer.next);
