import { FunctionDefinition } from "./../ast/function";
import * as R from "ramda";
import * as P from "parsimmon";
import { Location } from "./location";
import { Module } from "../ast/module";
import { Import } from "../ast/import";
import { File } from "../ast/file";

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
      .map(mod => new Module(Location.fromClause(mod), mod[0], mod[1][0])),

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
      .map(
        imp =>
          new Import(Location.fromClause(imp), imp[0], imp[1][0], imp[2][0]),
      ),
};

const FUNCTION_DEFINITION = {
  FunctionDefinition: (r: P.Language) =>
    r.DefKeyword.skip(P.whitespace)
      .then(P.seq(r.Identifier.skip(P.optWhitespace), r.ParameterList, r.Body))
      .wrap(P.optWhitespace, r.end)
      .map(f => new FunctionDefinition(Location.fromClause(f), f[0], f[1])),
};

export const CLAUSES = R.mergeAll([FILE, MODULE, IMPORT, FUNCTION_DEFINITION]);
