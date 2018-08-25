import { mapOperator } from "./operators";
import * as R from "ramda";
import * as P from "parsimmon";

import { Node } from "../ast/node";
import { Location } from "./location";
import { UnaryMinus } from "../ast/operator";
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

  // InfixFunctionExpression: (r: P.Language) =>
  //   P.seq(
  //     r.OperatorExpression,
  //     P.seq(
  //       r.Identifier.wrap(P.string("´"), P.string("´")).wrap(
  //         P.optWhitespace,
  //         P.optWhitespace,
  //       ),
  //       r.OperatorExpression,
  //     ).many(),
  //   )
  //     .mark()
  //     .map(({ start, end, value }) => {
  //       const [left, res] = value;

  //       if (res) {
  //         const [op, right] = res as any;
  //         return new BinaryOperator(
  //           new Location(start, end),
  //           op,
  //           left,
  //           right as any,
  //         );
  //       }

  //       return left;
  //     }),

  OperatorExpression: (r: P.Language) =>
    P.seq(
      r.AccessExpression,
      P.seq(
        r.Operator.wrap(P.optWhitespace, P.optWhitespace),
        r.AccessExpression,
      ).many(),
    ).map(buildOperatorTree),

  AccessExpression: (r: P.Language) =>
    P.seq(
      r.UnaryExpression,
      P.seq(
        r.DotOperator.wrap(P.optWhitespace, P.optWhitespace).map(mapOperator),
        r.Identifier,
      ).many(),
    ).map(buildOperatorTree),

  UnaryExpression: (r: P.Language) =>
    P.seq(r.SingleMinusOperator.atMost(1), r.Primary)
      .mark()
      .map(({ start, end, value }) => {
        if (value[0].length) {
          return new UnaryMinus(
            new Location(value[0][0].start, value[0][0].end),
            value[1],
          );
        } else {
          return value[1];
        }
      }),

  Primary: (r: P.Language) =>
    P.alt(
      r.Identifier,
      r.DoubleLiteral,
      r.StringLiteral,
      r.IntegerLiteral,
      r.Expression.wrap(
        r.LParen.wrap(P.optWhitespace, P.optWhitespace),
        r.RParen.wrap(P.optWhitespace, P.optWhitespace),
      ),
    ),
};
