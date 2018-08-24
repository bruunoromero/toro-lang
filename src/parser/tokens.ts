import * as P from "parsimmon";

import { Location } from "./location";
import { Identifier } from "../ast/identifier";
import { StringLiteral } from "./../ast/string";
import { DoubleLiteral } from "./../ast/double";
import { IntegerLiteral } from "./../ast/integer";

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
    r.IntegerNumber.mark().map(({ start, end, value }) => {
      const v = parseInt(value, 10);

      return new IntegerLiteral(new Location(start, end), v);
    }),
  DoubleLiteral: (r: P.Language) =>
    P.seq(r.IntegerNumber, r.DotOperator, P.regexp(/[0-9]+/))
      .mark()
      .map(({ start, end, value }) => {
        const init = value[0];
        const tail = value[2];
        const v = parseFloat(`${init}.${tail}`);

        return new DoubleLiteral(new Location(start, end), v);
      }),
};
