import * as P from "parsimmon";

import { Location } from "./location";
import { Generic } from "../ast/type";
import { TypeParameter, Type } from "./../ast/type";
import { FunctionParameter } from "./../ast/function";

const parensList = (r: P.Language, p: P.Parser<{}>) =>
  p
    .sepBy(r.Comma.wrap(P.optWhitespace, P.optWhitespace))
    .wrap(r.LParen, r.RParen);

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

  ArgumentList: (r: P.Language) => parensList(r, r.Expression),

  ParameterList: (r: P.Language) => parensList(r, r.Parameter),

  Parameter: (r: P.Language) =>
    P.seq(r.Identifier, r.ParameterType)
      .mark()
      .map(
        ({ start, end, value }) =>
          new FunctionParameter(new Location(start, end), value[0], value[1]),
      ),

  ParameterType: (r: P.Language) => r.Colon.trim(P.optWhitespace).then(r.Type),

  Type: (r: P.Language) =>
    P.seq(r.Reference, r.TypeParameterList.atMost(1))
      .or(r.Generic)
      .mark()
      .map(({ value, start, end }) => {
        if (value[0]) {
          if (value[1][0]) {
            return new Generic(
              new Location(start, end),
              value[0][0],
              value[1][0],
            );
          } else {
            return new Type(new Location(start, end), value[0][0]);
          }
        } else {
          return new TypeParameter(new Location(start, end), value);
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
