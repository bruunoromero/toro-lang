import * as moo from "moo";

export const lexer = moo.compile({
  LPAREN: /\(/,
  RPAREN: /\)/,
  LBRACE: /\[/,
  RBRACE: /\]/,
  LCURLY: /\{/,
  RCURLY: /\}/,
  WS: /[ \t]+/,
  COMMENT: /#.*/,
  INTEGER: /0|[1-9][0-9]*/,
  NL: { match: /\n+/, lineBreaks: true },
  DOUBLE: /(?:(?:0|[1-9][0-9]*)?\.[0-9]+)/,
  CHAR: { match: /'.*'/, value: t => t.slice(1, -1) },
  GENERIC: { match: /'[a-z]/, value: t => t.slice(1) },
  STRING: { match: /".*?"/, value: (t: any) => t.slice(1, -1) },
  OPERATOR: {
    match: /[.@^+\-$_*/|&!><%=?,]+/,
    keywords: {
      COMMA: ",",
      ARROW: "=>",
      RET: "->",
      SUB: "-",
      ADD: "+",
      EQ: "==",
      OR: "||",
      MUL: "*",
      NOT: "!",
      LTEQ: ">=",
      GTEQ: "<=",
      LT: "<",
      GT: ">",
      AND: "&&",
      ACCESS: ".",
      ASSIGN: "=",
    },
  },
  IDENTIFIER: {
    match: /[a-zA-Z][a-zA-Z0-9]*/,
    keywords: {
      IF: "if",
      AS: "AS",
      LET: "let",
      DEF: "def",
      ELSE: "else",
      STRUCT: "struct",
      MODULE: "module",
      EXPOSING: "exposing",
      INTERFACE: "interface",
    },
  },
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
