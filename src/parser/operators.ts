import { BinaryOperator } from "./../ast/operator";
import * as R from "ramda";
import * as P from "parsimmon";
import { Location } from "../ast/location";
import { Identifier } from "../ast/identifier";
const operator = (token: string, atLeast = 0) =>
  P.seq(P.string(token), P.regexp(/[:^+\-*/|&!><%=]/).atLeast(atLeast))
    .mark()
    .map(({ start, end, value }) => ({
      end,
      start,
      value: R.flatten(value).join(""),
    }));

export const mapOperator = ({ start, end, value }: any) => {
  const loc = new Location(start, end);

  return new BinaryOperator(loc, new Identifier(loc, value));
};

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
  NegationOperator: () => operator("!"),
  EqualityOperator: () => operator("=", 1),
  DotOperator: () =>
    P.string(".")
      .mark()
      .map(mapOperator),
  MultiplicationOperator: () => operator("*"),
  SingleMinusOperator: () => P.string("-").mark(),
  Operator: (r: P.Language) =>
    P.alt(
      r.GTOperator,
      r.LTOperator,
      r.OrOperator,
      r.AndOperator,
      r.PlusOperator,
      r.MinusOperator,
      r.ColonOperator,
      r.PowerOperator,
      r.ModulusOperator,
      r.DivisionOperator,
      r.EqualityOperator,
      r.NegationOperator,
      r.MultiplicationOperator,
      r.Identifier.wrap(P.string("´"), P.string("´")).map(
        ({ loc: { start, end }, name: value }) => ({ start, end, value }),
      ),
    ).map(mapOperator),
};
