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
  Expression: (r: P.Language) => r.OrExpression,

  OrExpression: (r: P.Language) =>
    expression(
      r.AndExpression,
      P.seq(
        r.OrOperator.wrap(P.optWhitespace, P.optWhitespace),
        r.AndExpression,
      ),
    ),

  AndExpression: (r: P.Language) =>
    expression(
      r.EqualityExpression,
      P.seq(
        r.AndOperator.wrap(P.optWhitespace, P.optWhitespace),
        r.EqualityExpression,
      ),
    ),

  EqualityExpression: (r: P.Language) =>
    expression(
      r.ComparassionExpression,
      P.seq(
        r.EqualityOperator.or(r.NegationOperator).wrap(
          P.optWhitespace,
          P.optWhitespace,
        ),
        r.ComparassionExpression,
      ),
    ),

  ComparassionExpression: (r: P.Language) =>
    expression(
      r.ColonExpression,
      P.seq(
        P.alt(r.GTOperator, r.LTOperator).wrap(
          P.optWhitespace,
          P.optWhitespace,
        ),
        r.ColonExpression,
      ),
    ),

  ColonExpression: (r: P.Language) =>
    expression(
      r.AdditionExpression,
      P.seq(
        r.ColonOperator.wrap(P.optWhitespace, P.optWhitespace),
        r.AdditionExpression,
      ),
    ),

  AdditionExpression: (r: P.Language) =>
    expression(
      r.MultiplicationExpression,
      P.seq(
        P.alt(r.PlusOperator, r.MinusOperator).wrap(
          P.optWhitespace,
          P.optWhitespace,
        ),
        r.MultiplicationExpression,
      ),
    ),

  MultiplicationExpression: (r: P.Language) =>
    expression(
      r.PowerExpression,
      P.seq(
        P.alt(
          r.ModulusOperator,
          r.DivisionOperator,
          r.MultiplicationOperator,
        ).wrap(P.optWhitespace, P.optWhitespace),
        r.PowerExpression,
      ),
    ),

  PowerExpression: (r: P.Language) =>
    expression(
      r.InfixFunctionExpression,
      P.seq(
        r.PowerOperator.wrap(P.optWhitespace, P.optWhitespace),
        r.InfixFunctionExpression,
      ),
    ),

  InfixFunctionExpression: (r: P.Language) =>
    P.seq(
      r.AccessExpression,
      P.seq(
        r.Identifier.wrap(P.string("´"), P.string("´")).wrap(
          P.optWhitespace,
          P.optWhitespace,
        ),
        r.AccessExpression,
      )
        .many()
        .map(R.head),
    )
      .mark()
      .map(({ start, end, value }) => {
        const [left, res] = value;

        if (res) {
          const [op, right] = res as any;
          return new BinaryOperator(
            new Location(start, end),
            op,
            left,
            right as any,
          );
        }

        return left;
      }),

  AccessExpression: (r: P.Language) =>
    P.seq(
      r.UnaryExpression,
      P.seq(
        r.DotOperator.wrap(P.optWhitespace, P.optWhitespace),
        r.UnaryExpression,
      )
        .many()
        .mark()
        .map(buildOperatorTree),
    )
      .mark()
      .map(({ start, end, value }) => {
        const [left, res] = value;

        if (res.length) {
          const [, right] = res;
          return new AccessOperator(
            new Location(start, end),
            left,
            right as any,
          );
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
