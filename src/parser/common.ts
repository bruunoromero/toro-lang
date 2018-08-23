import { TypeParameter, Type } from "./../ast/type";
import { Parameter } from "./../ast/parameter";
import * as P from "parsimmon";
import { Location } from "./location";
import { Generic } from "../ast/type";

export const COMMON = {
  Reference: (r: P.Language) =>
    P.sepBy1(r.Identifier, r.DotOperator.trim(P.optWhitespace)),

  ExposingDeclaration: (r: P.Language) =>
    P.whitespace
      .then(
        P.seq(
          r.ExposingKeyword.skip(P.optWhitespace),
          P.sepBy1(r.Identifier.trim(P.optWhitespace), r.Comma).wrap(
            r.LParen,
            r.RParen,
          ),
        ),
      )
      .map(exp => exp[1]),

  ParameterList: (r: P.Language) =>
    r.Parameter.sepBy(r.Comma).wrap(r.LParen, r.RParen),

  Parameter: (r: P.Language) =>
    P.seq(
      r.Identifier.skip(r.Colon.wrap(P.optWhitespace, P.optWhitespace)),
      r.Type,
    )
      .wrap(P.optWhitespace, P.optWhitespace)
      .map(p => new Parameter(Location.fromClause(p), p[0], p[1])),

  Type: (r: P.Language) =>
    P.seq(r.Reference, r.TypeParameterList.atMost(1))
      .or(r.Generic)
      .map(t => {
        if (t[0]) {
          if (t[1][0]) {
            return new Generic(Location.fromClause(t), t[0][0], t[1][0]);
          } else {
            return new Type(Location.fromToken(t[0][0]), t[0][0]);
          }
        } else {
          return new TypeParameter(Location.fromToken(t), t);
        }
      }),

  TypeParameterList: (r: P.Language) =>
    r.Type.trim(P.optWhitespace)
      .sepBy1(r.Comma)
      .wrap(r.LParen, r.RParen),

  Body: (r: P.Language) =>
    r.Identifier.trim(P.optWhitespace)
      .wrap(r.LCurly, r.RCurly)
      .wrap(P.whitespace, r.end),
};
