import * as R from "ramda";
import * as P from "parsimmon";

import { Node } from "../ast/node";
import { Identifier } from "../ast/identifier";
import { Location, Position } from "./location";
import { BinaryOperator } from "./../ast/operator";
import { UnaryMinus, AccessOperator } from "../ast/operator";

const buildOperator = (
  start: Position,
  end: Position,
  first: Node,
  op: any,
  second: Node,
) => {
  if ((op.value as string).endsWith(":")) {
    return new BinaryOperator(
      new Location(start, end),
      new Identifier(new Location(op.start, op.end), op.value),
      first,
      second,
    );
  }

  return new BinaryOperator(
    new Location(start, end),
    new Identifier(new Location(op.start, op.end), op.value),
    second,
    first,
  );
};

const mapper = ({ start, end, value }: any) => {
  const [first, res] = value;
  if (res.length) {
    const [op, second] = res;

    return buildOperator(start, end, first, op, second);
  }

  return first;
};

const buildOperatorTree = ({ start, end, value }: any) => {
  const exp = R.flatten(value).reverse();

  while (exp.length !== 2 && exp.length) {
    const [second, op, first] = exp.splice(0, 3) as any[];

    const result = buildOperator(start, end, first, op, second);
    exp.unshift(result);
  }

  return exp.reverse();
};

const expression = (start: P.Parser<{}>, end: P.Parser<{}>) =>
  P.seq(
    start,
    end
      .many()
      .mark()
      .map(buildOperatorTree),
  )
    .mark()
    .map(mapper);

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
    ).map(value => {
      const v = R.flatten(value);
      return v.slice(1).reduce((curr, acc) => {
        if (acc instanceof BinaryOperator) {
          return acc.push(curr);
        } else {
          return curr.push(acc);
        }
      }, v[0]);
    }),

  AccessExpression: (r: P.Language) =>
    P.seq(
      r.UnaryExpression,
      P.seq(r.DotOperator.wrap(P.optWhitespace, P.optWhitespace), r.Identifier)
        .many()
        .mark()
        .map(buildOperatorTree),
    )
      .mark()
      .map(({ start, end, value }) => {
        const [left, res] = value;
        if (res.length) {
          const [, right] = res;
          return new AccessOperator(new Location(start, end))
            .push(left)
            .push(right as Node);
        }

        return left;
      }),

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
