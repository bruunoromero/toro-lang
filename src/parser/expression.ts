import * as R from "ramda";
import * as P from "parsimmon";

import { Node } from "../ast/node";
import { Location } from "./location";
import { CallExpression, FunctionExpression } from "./../ast/function";
import { BinaryOperator } from "./../ast/operator";
import { UnaryMinus, Parenthesis } from "../ast/operator";
import { bodyWrapper } from "./common";

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
  Expression: (r: P.Language) =>
    r.OperatorExpression.skip(r.end).trim(P.optWhitespace),

  FunctionExpression: (r: P.Language) =>
    P.seq(
      r.ParameterList.trim(P.optWhitespace),
      r.ParameterType.atMost(1).skip(P.string("=>").trim(P.optWhitespace)),
      r.AsyncKeyword.atMost(1).trim(P.optWhitespace),
      bodyWrapper(r, r.Expression.atLeast(1)),
    )
      .mark()
      .map(({ start, end, value: [params, [returns], [async], body] }) => {
        return new FunctionExpression(
          new Location(start, end),
          params,
          async,
          body,
          returns,
        );
      }),

  OperatorExpression: (r: P.Language) =>
    P.seq(
      r.AccessExpression,
      P.seq(r.Operator.wrap(r._, P.optWhitespace), r.AccessExpression).many(),
    ).map(buildOperatorTree),

  AccessExpression: (r: P.Language) =>
    P.seq(
      r.UnaryExpression,
      P.seq(r.DotOperator.wrap(r._, P.optWhitespace), r.UnaryExpression).many(),
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
      r.CallExpression,
      r.DoubleLiteral,
      r.StringLiteral,
      r.IntegerLiteral,
      r.FunctionExpression,
    ),

  CallExpression: (r: P.Language) =>
    P.seq(
      P.alt(
        r.Identifier,
        r.Expression.wrap(
          r.LParen.trim(P.optWhitespace),
          r.RParen.trim(P.optWhitespace),
        )
          .mark()
          .map(({ start, end, value }) => {
            return new Parenthesis(new Location(start, end), value);
          }),
      ).skip(P.optWhitespace),
      r.ArgumentList.many(),
    )
      .mark()
      .map(({ start, end, value: [callee, calls] }) => {
        if (!calls.length) return callee;

        return calls.reduce((acc, curr) => {
          return new CallExpression(acc.loc, acc, curr);
        }, callee);
      }),
};
