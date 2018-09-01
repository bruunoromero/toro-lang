import { RecordLiteral, RecordUpdate } from "./../ast/record";
import { ListLiteral } from "../ast/list";
import * as P from "parsimmon";

import { Location } from "./location";
import { Identifier } from "../ast/identifier";
import { StringLiteral } from "../ast/string";
import { DoubleLiteral } from "../ast/double";
import { IntegerLiteral } from "../ast/integer";
import { FunctionLiteral } from "../ast/function";
import { RecordProperty } from "../ast/record";

export const PRIMITIVES = {
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

  ListLiteral: (r: P.Language) =>
    r.Expression.sepBy(r.Comma.trim(r.none))
      .wrap(r.LBrace.trim(r.none), r.RBrace.trim(r.none))
      .mark()
      .map(
        ({ start, end, value }) =>
          new ListLiteral(new Location(start, end), value),
      ),

  RecordProperties: (r: P.Language) =>
    P.seq(r.Identifier.skip(r.Assign.trim(r.none)), r.Expression)
      .sepBy(r.Comma.trim(r.none))
      .mark()
      .map(({ start, end, value }) =>
        value.map(
          ([key, expr]) =>
            new RecordProperty(new Location(start, end), key, expr),
        ),
      ),

  RecordLiteral: (r: P.Language) =>
    r.RecordProperties.wrap(r.LCurly.trim(r.none), r.RCurly.trim(r.none))
      .mark()
      .map(
        ({ start, end, value }) =>
          new RecordLiteral(new Location(start, end), value),
      ),

  RecordUpdate: (r: P.Language) =>
    P.seq(r.Identifier.skip(r.Pipe.trim(r.none)), r.RecordProperties)
      .wrap(r.LCurly.trim(r.none), r.RCurly.trim(r.none))
      .mark()
      .map(
        ({ start, end, value: [id, props] }) =>
          new RecordUpdate(new Location(start, end), id, props),
      ),

  FunctionLiteral: (r: P.Language) =>
    P.seq(
      r.ParameterList.trim(r.none),
      r.ParameterType.atMost(1).skip(r.Arrow.trim(r.none)),
      r.AsyncKeyword.atMost(1).trim(r.none),
      r.Body,
    )
      .mark()
      .map(({ start, end, value: [params, [type], [async], body] }) => {
        return new FunctionLiteral(
          new Location(start, end),
          null,
          params,
          async,
          body,
          type,
        );
      }),

  Primitive: (r: P.Language) =>
    P.alt(
      r.RecordUpdate,
      r.RecordLiteral,
      r.ListLiteral,
      r.DoubleLiteral,
      r.StringLiteral,
      r.IntegerLiteral,
      r.FunctionLiteral,
    ),
};
