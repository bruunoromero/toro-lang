import * as R from "ramda";
import * as P from "parsimmon";

import { File } from "../ast/file";
import { Location } from "./location";
import { Module } from "../ast/module";
import { Import } from "../ast/import";
import { FunctionExpression } from "./../ast/function";

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
          r.Identifier.or(r.Operator).skip(P.optWhitespace),
          r.RequiredParenParameterList.atMost(1).skip(
            P.string("=").trim(P.optWhitespace),
          ),
          r.Expression,
        ),
      )
      .wrap(P.optWhitespace, r.end)
      .mark()
      .map(({ start, end, value }) => console.log()),
};

export const CLAUSES = R.mergeAll([FILE, MODULE, IMPORT, FUNCTION_DEFINITION]);
