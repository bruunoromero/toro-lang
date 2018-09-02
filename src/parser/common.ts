import * as P from "parsimmon";

import { Body } from "../ast/body";
import { Location } from "../ast/location";
import { Generic, FirstTypeNode } from "../ast/type";
import { TypeParameter, Type } from "./../ast/type";
import { FunctionParameter } from "./../ast/function";

const parensList = (r: P.Language, p: P.Parser<{}>) =>
  p
    .sepBy(r.Comma.wrap(P.optWhitespace, P.optWhitespace))
    .wrap(r.LParen, r.RParen);

export const COMMON = {
  Reference: (r: P.Language) =>
    P.sepBy1(r.Identifier, r.DotOperator.trim(r.none)).map(value =>
      value
        .slice(1)
        .reduce((acc, curr) => acc.push(curr), new FirstTypeNode(value[0])),
    ),

  Body: (r: P.Language) =>
    r.Expression.atLeast(1)
      .wrap(r.LCurly, r.RCurly)
      .trim(r.none)
      .mark()
      .map(
        ({ start, end, value }) => new Body(new Location(start, end), value),
      ),

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
};
