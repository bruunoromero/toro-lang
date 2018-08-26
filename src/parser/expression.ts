import { mapOperator } from "./operators";
import * as R from "ramda";
import * as P from "parsimmon";

import { Node } from "../ast/node";
import { Location } from "./location";
import { UnaryMinus, Parenthesis } from "../ast/operator";
import { BinaryOperator } from "./../ast/operator";

const buildOperatorTree = (value: any) => {
  const v = R.flatten(value);
  return v.slice(1).reduce((curr, acc) => {
    if (acc instanceof BinaryOperator) {
      return acc.push(curr as Node);
    } else {
      return (curr as BinaryOperator).push(acc as Node);
    }
  }, v[0]);
};

export const EXPRESSION = {
  Expression: (r: P.Language) => r.OperatorExpression,

  FunctionCall: (r: P.Language) =>
    P.seq(r.Reference.skip(P.optWhitespace), r.ArgumentList).mark(),

  OperatorExpression: (r: P.Language) =>
    P.seq(
      r.UnaryExpression,
      P.seq(r.Operator.trim(P.optWhitespace), r.UnaryExpression).many(),
    ).map(buildOperatorTree),

  UnaryExpression: (r: P.Language) =>
    P.seq(r.SingleMinusOperator.atMost(1), r.Primary)
      .mark()
      .map(({ start, end, value }) => {
        if (value[0].length) {
          return new UnaryMinus(new Location(start, end), value[1]);
        } else {
          return value[1];
        }
      }),

  Primary: (r: P.Language) =>
    P.alt(
      r.FunctionCall,
      r.Identifier,
      r.DoubleLiteral,
      r.StringLiteral,
      r.IntegerLiteral,
      r.Expression.wrap(
        r.LParen.trim(P.optWhitespace),
        r.RParen.trim(P.optWhitespace),
      )
        .mark()
        .map(({ start, end, value }) => {
          return new Parenthesis(new Location(start, end), value);
        }),
    ),
};
