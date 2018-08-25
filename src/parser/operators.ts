import * as R from "ramda";
import * as P from "parsimmon";
const operator = (token: string) =>
  P.seq(P.string(token), P.regexp(/[:^+\-*/|&!><%=]/).many())
    .mark()
    .map(({ start, end, value }) => ({
      end,
      start,
      value: R.flatten(value).join(""),
    }));

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

enum OperatorAssociativity {
  Left,
  Right,
}

interface OperatorOpt {
  precedence: number;
  associativity: OperatorAssociativity;
}

const OPERATORS_OPT = {
  "|": { precedence: 1, associativity: OperatorAssociativity.Left },
  "&": { precedence: 2, associativity: OperatorAssociativity.Left },
  "=": { precedence: 3, associativity: OperatorAssociativity.Left },
  "!": { precedence: 3, associativity: OperatorAssociativity.Left },
  ">": { precedence: 4, associativity: OperatorAssociativity.Left },
  "<": { precedence: 4, associativity: OperatorAssociativity.Left },
  ":": { precedence: 5, associativity: OperatorAssociativity.Left },
  "+": { precedence: 6, associativity: OperatorAssociativity.Left },
  "-": { precedence: 6, associativity: OperatorAssociativity.Left },
  "*": { precedence: 7, associativity: OperatorAssociativity.Left },
  "/": { precedence: 7, associativity: OperatorAssociativity.Left },
  "%": { precedence: 7, associativity: OperatorAssociativity.Left },
  "^": { precedence: 8, associativity: OperatorAssociativity.Left },
};
