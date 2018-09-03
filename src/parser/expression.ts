import * as R from "ramda";
import * as P from "parsimmon";

import { Node } from "../ast/node";
import { Location } from "../ast/location";
import { IfStatement } from "../ast/if";
import { AwaitExpression } from "../ast/await";
import { BinaryOperator } from "./../ast/operator";
import { CallExpression } from "./../ast/function";
import { AssignmentExpression } from "../ast/assignment";
import { UnaryMinus, Parenthesis } from "../ast/operator";

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
    P.alt(
      r.IfExpression,
      r.AssignExpression,
      r.AwaitExpression,
      r.OperatorExpression,
    ).trim(r.none),

  AccessExpression: (r: P.Language) =>
    P.seq(
      r.UnaryExpression,
      P.seq(r.DotOperator.wrap(r._, r.none), r.UnaryExpression).many(),
    ).map(buildOperatorTree),

  AssignExpression: (r: P.Language) =>
    P.seq(
      P.seq(
        r.LetKeyword.skip(r.none),
        r.MutKeyword.atMost(1).skip(r.none),
      ).atMost(1),
      r.Identifier,
      r.ParameterType.atMost(1).skip(r.Assign.trim(r.none)),
      r.Expression,
    )
      .mark()
      .map(({ start, end, value: [[st], id, [type], stmt] }) => {
        const definition = st && st[0];
        const mutable = st && st[1][0];

        return new AssignmentExpression(
          new Location(start, end),
          definition,
          mutable,
          id,
          stmt,
          type,
        );
      }),

  AwaitExpression: (r: P.Language) =>
    r.AwaitKeyword.skip(r.none)
      .then(r.Expression)
      .mark()
      .map(
        ({ start, end, value }) =>
          new AwaitExpression(new Location(start, end), value),
      ),

  CallExpression: (r: P.Language) =>
    P.seq(
      P.alt(
        P.alt(r.Identifier, r.CapIdentifier),
        r.Expression.wrap(r.LParen.trim(r.none), r.RParen.trim(r.none))
          .mark()
          .map(({ start, end, value }) => {
            return new Parenthesis(new Location(start, end), value);
          }),
      ).skip(r.none),
      r.ArgumentList.many(),
    )
      .mark()
      .map(({ start, end, value: [callee, calls] }) => {
        if (!calls.length) return callee;

        return calls.reduce((acc, curr) => {
          return new CallExpression(acc.loc, acc, curr);
        }, callee);
      }),

  IfExpression: (r: P.Language) =>
    r.IfKeyword.then(
      P.seq(r.Expression.trim(r.none), r.Body, r.ElseKeyword.then(r.Body)),
    )
      .mark()
      .map(
        ({ start, end, value: [test, consequent, alternate] }) =>
          new IfStatement(
            new Location(start, end),
            test,
            consequent,
            alternate,
          ),
      ),

  OperatorExpression: (r: P.Language) =>
    P.seq(
      r.AccessExpression,
      P.seq(r.Operator.wrap(r._, r.none), r.AccessExpression).many(),
    ).map(buildOperatorTree),

  Primary: (r: P.Language) => P.alt(r.CallExpression, r.Primitive),

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
};
