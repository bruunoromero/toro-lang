import * as P from "parsimmon";

import { Location } from "../ast/location";
import { ListType } from "../ast/list";
import { TupleType } from "../ast/tuple";
import { TypeParameter, Generic } from "../ast/type";
import { FunctionType } from "../ast/function";

export const TYPES = {
  Type: (r: P.Language) =>
    P.alt(r.FunctionType, r.ListType, r.TupleType, r.RefType),

  RefType: (r: P.Language) =>
    P.alt(P.seq(r.Reference, r.TypeParameterList.atMost(1)), r.Generic)
      .mark()
      .map(({ start, end, value }) => {
        if (Array.isArray(value)) {
          if (value[1][0]) {
            return new Generic(new Location(start, end), value[0], value[1][0]);
          } else {
            return value[0];
          }
        } else {
          return new TypeParameter(value);
        }
      }),

  TypeParameterList: (r: P.Language) =>
    r.Type.sepBy1(r.Comma.trim(r.none)).wrap(
      r.LParen.trim(r.none),
      r.RParen.trim(r.none),
    ),

  TupleType: (r: P.Language) =>
    r.Type.sepBy1(r.Comma.trim(r.none))
      .wrap(r.LCurly.trim(r.none), r.RCurly.trim(r.none))
      .mark()
      .map(
        ({ start, end, value }) =>
          new TupleType(new Location(start, end), value),
      ),

  ListType: (r: P.Language) =>
    r.Type.wrap(r.LBrace.trim(r.none), r.RBrace.trim(r.none))
      .mark()
      .map(
        ({ start, end, value }) =>
          new ListType(new Location(start, end), value),
      ),

  FunctionTypeParameters: (r: P.Language) =>
    r.Type.sepBy(r.Comma.trim(r.none)).wrap(
      r.LParen.trim(r.none),
      r.RParen.trim(r.none),
    ),

  FunctionType: (r: P.Language) =>
    P.seq(r.FunctionTypeParameters.skip(r.Arrow.trim(r.none)), r.Type)
      .mark()
      .map(
        ({ start, end, value: [params, type] }) =>
          new FunctionType(new Location(start, end), params, type),
      ),
};
