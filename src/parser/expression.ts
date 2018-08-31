import * as R from "ramda";
import * as P from "parsimmon";

import { Node } from "../ast/node";
import { Location } from "./location";
import { BinaryOperator } from "./../ast/operator";
import { UnaryMinus, Parenthesis } from "../ast/operator";
import { CallExpression, FunctionExpression } from "./../ast/function";
import { AssignmentExpression } from "../ast/assignment";

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
    P.alt(r.AssignExpression, r.OperatorExpression).trim(r.opt),

  AssignExpression: (r: P.Language) =>
    P.seq(
      r.LetKeyword.skip(P.whitespace).then(r.Identifier),
      r.ParameterType.atMost(1).skip(P.string("=").trim(r.opt)),
      r.Expression,
    )
      .mark()
      .map(({ start, end, value: [id, [type], stmt] }) => {
        return new AssignmentExpression(
          new Location(start, end),
          id,
          stmt,
          type,
        );
      }),

  FunctionExpression: (r: P.Language) =>
    P.seq(
      r.ParameterList.trim(r.opt),
      r.ParameterType.atMost(1).skip(P.string("=>").trim(r.opt)),
      r.AsyncKeyword.atMost(1).trim(r.opt),
      r.Expression.atLeast(1).wrap(r.LCurly, r.RCurly),
    )
      .mark()
      .map(({ start, end, value: [params, [type], [async], body] }) => {
        return new FunctionExpression(
          new Location(start, end),
          params,
          async,
          body,
          type,
        );
      }),

  OperatorExpression: (r: P.Language) =>
    P.seq(
      r.AccessExpression,
      P.seq(r.Operator.wrap(r._, r.opt), r.AccessExpression).many(),
    ).map(buildOperatorTree),

  AccessExpression: (r: P.Language) =>
    P.seq(
      r.UnaryExpression,
      P.seq(r.DotOperator.wrap(r._, r.opt), r.UnaryExpression).many(),
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
        r.Expression.wrap(r.LParen.trim(r.opt), r.RParen.trim(r.opt))
          .mark()
          .map(({ start, end, value }) => {
            return new Parenthesis(new Location(start, end), value);
          }),
      ).skip(r.opt),
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
