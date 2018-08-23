import { Location } from "./../location";
import { Module } from "../../ast/module";
import { Exposing } from "../../ast/exposing";
import { Identifier } from "../../ast/identifier";
import { ImportOpts, ImportClause } from "../../ast/import";

export const $header = ([mod, imports]: any) => {
  if (imports) {
    mod.imports = imports[1][0];
  }

  return mod;
};

export const $module = (data: any) => {
  const [, , name, exp] = data;
  const exposing = exp ? exp[1] : [];

  return new Module(Location.fromClause(data), name, exposing);
};

export const $moduleName = (data: any) => {
  return data[0].map((m: Identifier[]) => m[0]);
};

export const $exposing = (data: any): Exposing => {
  const [, , , ids] = data;

  return new Exposing(Location.fromClause(data), ids);
};

export const $exposed = (data: any) => {
  return data[1][0];
};

export const $import = (data: any) => {
  const [, , nameArr, optsArr] = data;
  const name = nameArr[0];

  const { alias, exposing }: ImportOpts = optsArr ? optsArr[1] : {};

  return new ImportClause(Location.fromClause(data), name, alias, exposing);
};

export const $importOpts = (data: any) => {
  const opts = new ImportOpts(Location.fromClause(data));

  if (data[0]) {
    opts.alias = data[0];
  }

  if (data[1]) {
    opts.exposing = data[1][1];
  }

  return opts;
};

export const $importAs = (data: any) => {
  return data[2];
};
