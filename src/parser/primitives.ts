import * as P from "parsimmon";

import { ListLiteral } from "../ast/list";
import { Location } from "../ast/location";
import { CharLiteral } from "./../ast/char";
import { TupleLiteral } from "./../ast/tuple";
import { StringLiteral } from "../ast/string";
import { DoubleLiteral } from "../ast/double";
import { Identifier } from "../ast/identifier";
import { IntegerLiteral } from "../ast/integer";
import { FunctionLiteral } from "../ast/function";
import { RecordProperty, RecordLiteral, RecordUpdate } from "../ast/record";

export const PRIMITIVES = {
  Identifier: () =>
    P.regexp(/[a-z][a-zA-Z0-9_]*/)
      .mark()
      .map(
        ({ start, end, value }) =>
          new Identifier(new Location(start, end), value),
      ),

  CapIdentifier: () =>
    P.regexp(/[A-Z][a-zA-Z0-9_]*/)
      .mark()
      .map(
        ({ start, end, value }) =>
          new Identifier(new Location(start, end), value),
      ),

  Generic: () =>
    P.regexp(/'[a-z]+/)
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

  CharLiteral: () =>
    P.regexp(/'.'/)
      .mark()
      .map(
        ({ start, end, value }) =>
          new CharLiteral(new Location(start, end), value.slice(1, -1)),
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
      .mark()
      .sepBy(r.Comma.trim(r.none))
      .map(value =>
        value.map(
          ({ start, end, value: [key, expr] }) =>
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

  TupleLiteral: (r: P.Language) =>
    r.Expression.sepBy(r.Comma.trim(r.none))
      .wrap(r.LCurly.trim(r.none), r.RCurly.trim(r.none))
      .mark()
      .map(
        ({ start, end, value }) =>
          new TupleLiteral(new Location(start, end), value),
      ),

  FunctionLiteral: (r: P.Language) =>
    P.seq(
      r.ParameterList.trim(r.none),
      r.ParameterType.atMost(1).skip(r.Arrow.trim(r.none)),
      r.AsyncKeyword.atMost(1).trim(r.none),
      r.Body,
    )
      .mark()
      .map(({ start, end, value: [params, [type], [hasAsync], body] }) => {
        const async = (hasAsync && hasAsync === "async") || false;

        return new FunctionLiteral(
          new Location(start, end),
          null,
          params,
          async,
          false,
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
