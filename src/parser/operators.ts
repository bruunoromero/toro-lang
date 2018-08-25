import * as P from "parsimmon";

const operator = (token: string) =>
  P.seq(P.string(token), P.regexp(/[:@^+\-$_*/|&!><%=?]/).many()).mark();

export const OPERATORS = {
  GTOperator: () => operator(">"),
  LTOperator: () => operator("<"),
  OrOperator: () => operator("|"),
  AndOperator: () => operator("&"),
  PlusOperator: () => operator("+"),
  MinusOperator: () => operator("-"),
  ColonOperator: () => operator(":"),
  PowerOperator: () => operator("^"),
  ModulusOperator: () => operator("%"),
  DivisionOperator: () => operator("/"),
  EqualityOperator: () => operator("="),
  NegationOperator: () => operator("!"),
  DotOperator: () => P.string(".").mark(),
  MultiplicationOperator: () => operator("*"),
  SingleMinusOperator: () => P.string("-").mark(),
  Operator: () => P.regexp(/[:@^+\-$_*/|&!><%=?]+/).mark(),
};
