import * as moo from "moo";

export const lexer = moo.compile({
  LPAREN: /\(/,
  RPAREN: /\(/,
  LBRACE: /\[/,
  RBRACE: /\]/,
  LCURLY: /\}/,
  RCURLY: /\}/,
  WS: { match: /\s+/, lineBreaks: true },
  IDENTIFIER: {
    match: /^[^ \n]*$/,
    keywords: {
      COLON: ":",
    },
  },
});

lexer.next = (next => () => {
  let tok;
  // tslint:disable-next-line:no-conditional-assignment
  while ((tok = next.call(lexer)) && tok.type === "WS") {}
  return tok;
})(lexer.next);
