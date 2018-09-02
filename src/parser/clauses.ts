import { Constructor, Union } from "./../ast/union";
import * as R from "ramda";
import * as P from "parsimmon";

import { File } from "../ast/file";
import { Location } from "../ast/location";
import { Module } from "../ast/module";
import { Import, Extern } from "../ast/import";
import { StringLiteral } from "./../ast/string";
import { FunctionLiteral } from "./../ast/function";
import { Generic, Type, TypeParameter } from "../ast/type";
import { RecordPropertyType, RecordType } from "../ast/record";

const FILE = {
  File: (r: P.Language) =>
    P.seq(
      r.ModuleDeclaration,
      P.alt(r.ImportDeclaration, r.ExternDeclaration).many(),
      r.FunctionDefinition.many(),
    )
      .trim(r.none)
      .map(([mod, impOrExt, funs]) => {
        const impts = impOrExt.filter(ie => ie instanceof Import);
        const externs = impOrExt.filter(ie => ie instanceof Extern);

        return new File(mod, impts, externs, funs);
      }),
};

const MODULE = {
  ModuleDeclaration: (r: P.Language) =>
    r.ModuleKeyword.skip(P.whitespace)
      .then(P.seq(r.Reference, r.ExposingDeclaration.atMost(1)))
      .wrap(r.none, r.end)
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
  ExternDeclaration: (r: P.Language) =>
    r.ExternKeyword.skip(r.none)
      .then(P.seq(r.StringLiteral, r.AsDeclaration))
      .wrap(r.none, r.end)
      .mark()
      .map(
        ({ start, end, value: [path, as] }) =>
          new Extern(
            new Location(start, end),
            (path as StringLiteral).value,
            as,
          ),
      ),

  ImportDeclaration: (r: P.Language) =>
    r.ImportKeyword.skip(r.none)
      .then(
        P.seq(
          r.Reference,
          r.AsDeclaration.atMost(1),
          r.ExposingDeclaration.atMost(1),
        ),
      )
      .wrap(r.none, r.end)
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

const DEFINITION = {
  Definition: (r: P.Language) =>
    P.alt(r.FunctionDefinition, r.DataDefinition, r.UnionDefinition),

  FunctionDefinition: (r: P.Language) =>
    P.seq(
      P.alt(r.AsyncKeyword, r.RecKeyword)
        .atMost(1)
        .skip(r.FunKeyword.trim(r.none)),
      P.alt(r.Identifier, r.Operator).skip(r.none),
      r.ParameterList.trim(r.none),
      r.ParameterType.atMost(1).trim(r.none),
      r.Body,
    )
      .trim(r.none)
      .mark()
      .map(
        ({ start, end, value: [[asyncOrRec], id, params, [type], body] }) => {
          const rec = (asyncOrRec && asyncOrRec === "rec") || false;
          const async = (asyncOrRec && asyncOrRec === "async") || false;

          return new FunctionLiteral(
            new Location(start, end),
            id,
            params,
            async,
            rec,
            body,
            type,
          );
        },
      ),

  UnionType: (r: P.Language) =>
    P.seq(
      r.Identifier.skip(r.none),
      r.Generic.sepBy(r.Comma.trim(r.none))
        .wrap(r.LParen.trim(r.none), r.RParen.trim(r.none))
        .atMost(1),
    ),

  UnionContructorType: (r: P.Language) =>
    P.seq(r.Identifier.skip(r.none), r.TypeParameterList.atMost(1))
      .mark()
      .map(
        ({ start, end, value: [id, [params]] }) =>
          new Constructor(new Location(start, end), id, params),
      ),

  UnionDefinition: (r: P.Language) =>
    r.TypeKeyword.skip(r.none)
      .then(
        P.seq(
          r.UnionType.skip(r.Assign.trim(r.none)),
          r.UnionContructorType.sepBy1(r.Pipe.trim(r.none)),
        ),
      )
      .mark()
      .map(
        ({ start, end, value: [[id, [params]], ctors] }) =>
          new Union(new Location(start, end), id, params, ctors),
      ),

  DataDefinition: (r: P.Language) =>
    r.DataKeyword.skip(r.none)
      .then(P.seq(r.Identifier.skip(r.Assign.trim(r.none)), r.RecordType))
      .mark()
      .map(
        ({ start, end, value: [id, props] }) =>
          new RecordType(new Location(start, end), id, props),
      ),

  RecordPropertiesType: (r: P.Language) =>
    P.seq(r.Identifier.skip(r.Colon.trim(r.none)), r.Type)
      .mark()
      .sepBy(r.Comma.trim(r.none))
      .map(value =>
        value.map(
          ({ start, end, value: [key, type] }) =>
            new RecordPropertyType(new Location(start, end), key, type),
        ),
      ),

  RecordType: (r: P.Language) =>
    r.RecordPropertiesType.wrap(r.LCurly.trim(r.none), r.RCurly.trim(r.none)),
};

export const CLAUSES = R.mergeAll([FILE, MODULE, IMPORT, DEFINITION]);
