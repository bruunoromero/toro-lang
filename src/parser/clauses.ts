import * as R from "ramda";
import * as P from "parsimmon";

import { File } from "../ast/file";
import { Location } from "./location";
import { Module } from "../ast/module";
import { Import } from "../ast/import";
import { FunctionDefinition } from "./../ast/function";

const FILE = {
  File: (r: P.Language) =>
    P.seq(
      r.ModuleDeclaration,
      r.ImportDeclaration.many(),
      r.FunctionDefinition.many(),
    )
      .trim(P.optWhitespace)
      .map(file => new File(file[0], file[1], file[2])),
};

const MODULE = {
  ModuleDeclaration: (r: P.Language) =>
    r.ModuleKeyword.skip(P.whitespace)
      .then(P.seq(r.Reference, r.ExposingDeclaration.atMost(1)))
      .wrap(P.optWhitespace, r.end)
      .mark()
      .map(
        ({ start, end, value }) =>
          new Module(new Location(start, end), value[0], value[1][0]),
      ),

  AsDeclaration: (r: P.Language) =>
    P.whitespace
      .then(P.seq(r.AsKeyword.skip(P.whitespace), r.Identifier))
      .map(alias => alias[1]),
};

const IMPORT = {
  ImportDeclaration: (r: P.Language) =>
    r.ImportKeyword.skip(P.whitespace)
      .then(
        P.seq(
          r.Reference,
          r.AsDeclaration.atMost(1),
          r.ExposingDeclaration.atMost(1),
        ),
      )
      .wrap(P.optWhitespace, r.end)
      .mark()
      .map(
        ({ start, end, value }) =>
          new Import(
            new Location(start, end),
            value[0],
            value[1][0],
            value[2][0],
          ),
      ),
};

const FUNCTION_DEFINITION = {
  FunctionDefinition: (r: P.Language) =>
    r.DefKeyword.skip(P.whitespace)
      .then(
        P.seq(
          r.Identifier.skip(P.optWhitespace),
          r.RequiredParenParameterList,
          r.Body,
        ),
      )
      .wrap(P.optWhitespace, r.end)
      .mark()
      .map(
        ({ start, end, value }) =>
          new FunctionDefinition(new Location(start, end), value[0], value[1]),
      ),
};

const EXPRESSION = {
  Expression: (r: P.Language) => r.OrExpression,

  OrExpression: (r: P.Language) =>
    P.seq(
      r.AndExpression,
      P.seq(
        r.OrOperator.wrap(P.optWhitespace, P.optWhitespace),
        r.AndExpression,
      ).many(),
    ).mark(),

  AndExpression: (r: P.Language) =>
    P.seq(
      r.EqualityExpression,
      P.seq(
        r.AndOperator.wrap(P.optWhitespace, P.optWhitespace),
        r.EqualityExpression,
      ).many(),
    ).mark(),

  EqualityExpression: (r: P.Language) =>
    P.seq(
      r.ComparassionExpression,
      P.seq(
        r.EqualityOperator.or(r.NegationOperator).wrap(
          P.optWhitespace,
          P.optWhitespace,
        ),
        r.ComparassionExpression,
      ).many(),
    ).mark(),

  ComparassionExpression: (r: P.Language) =>
    P.seq(
      r.ColonExpression,
      P.seq(
        P.alt(r.GTOperator, r.LTOperator).wrap(
          P.optWhitespace,
          P.optWhitespace,
        ),
        r.ColonExpression,
      ).many(),
    ).mark(),

  ColonExpression: (r: P.Language) =>
    P.seq(
      r.MultiplicationExpression,
      P.seq(
        r.ColonOperator.wrap(P.optWhitespace, P.optWhitespace),
        r.MultiplicationExpression,
      ).many(),
    ).mark(),

  MultiplicationExpression: (r: P.Language) =>
    P.seq(
      r.PowerExpression,
      P.seq(
        P.alt(
          r.ModulusOperator,
          r.DivisionOperator,
          r.MultiplicationOperator,
        ).wrap(P.optWhitespace, P.optWhitespace),
        r.PowerExpression,
      ).many(),
    ).mark(),

  PowerExpression: (r: P.Language) =>
    P.seq(
      r.HigherPrecedenceExpression,
      P.seq(
        r.PowerOperator.wrap(P.optWhitespace, P.optWhitespace),
        r.HigherPrecedenceExpression,
      ).many(),
    ).mark(),

  HigherPrecedenceExpression: (r: P.Language) =>
    P.seq(
      r.UnaryExpression,
      P.seq(
        r.Operator.wrap(P.optWhitespace, P.optWhitespace),
        r.UnaryExpression,
      ).many(),
    ).mark(),

  UnaryExpression: (r: P.Language) =>
    P.seq(r.Operator.skip(P.optWhitespace), r.UnaryExpression)
      .or(r.Primary)
      .mark(),

  Primary: (r: P.Language) =>
    P.alt(
      r.DoubleLiteral,
      r.IntegerLiteral,
      r.StringLiteral,
      r.Expression.wrap(
        r.LParen.wrap(P.optWhitespace, P.optWhitespace),
        r.RParen.wrap(P.optWhitespace, P.optWhitespace),
      ),
    ),
};

export const CLAUSES = R.mergeAll([
  FILE,
  MODULE,
  IMPORT,
  EXPRESSION,
  FUNCTION_DEFINITION,
]);
