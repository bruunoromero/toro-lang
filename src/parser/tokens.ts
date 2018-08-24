import { StringLiteral } from "./../ast/string";
import { DoubleLiteral } from "./../ast/double";
import { IntegerLiteral } from "./../ast/integer";
import * as P from "parsimmon";

import { Location } from "./location";
import { Identifier } from "../ast/identifier";

export const TOKENS = {
  Identifier: () =>
    P.regexp(/[a-zA-Z][a-zA-Z0-9]*/)
      .mark()
      .map(
        ({ start, end, value }) =>
          new Identifier(new Location(start, end), value),
      ),

  Generic: () =>
    P.regexp(/'[a-z]/)
      .mark()
      .map(
        ({ start, end, value }) =>
          new Identifier(new Location(start, end), value.slice(1)),
      ),

  StringLiteral: () =>
    P.regexp(/".*"/)
      .mark()
      .map(
        ({ start, end, value }) =>
          new StringLiteral(new Location(start, end), value.slice(1, -1)),
      ),
  IntegerNumber: () => P.regexp(/0|[1-9][0-9]*/),
  IntegerLiteral: (r: P.Language) =>
    P.seq(r.MinusOperator.atMost(1).skip(P.optWhitespace), r.IntegerNumber)
      .node("IntegerLiteral")
      .map(({ start, end, value }) => {
        let v = parseInt(value[1], 10);
        if (value[0].length) {
          v *= -1;
        }
        return new IntegerLiteral(new Location(start, end), v);
      }),
  DoubleLiteral: (r: P.Language) =>
    P.seq(
      r.MinusOperator.atMost(1).skip(P.optWhitespace),
      r.IntegerNumber,
      r.DotOperator,
      P.regexp(/[0-9]+/),
    )
      .mark()
      .map(({ start, end, value }) => {
        const init = value[1];
        const tail = value[3];
        let v = parseFloat(`${init}.${tail}`);
        // let value = parseInt(n.value[1], 10);
        if (value[0].length) {
          v *= -1;
        }
        return new DoubleLiteral(new Location(start, end), v);
      }),
};
