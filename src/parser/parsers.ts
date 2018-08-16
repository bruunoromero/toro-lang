import { Parameter } from "./../untyped-ast/parameter";
import { Type } from "./../untyped-ast/type";
import * as R from "ramda";
import { ImportClause } from "../untyped-ast/import-clause";
import { pprint } from "../utils/print";
import { Identifier } from "../untyped-ast/identifier";
import { Reference } from "../untyped-ast/reference";

export const $import = (data: any): ImportClause => {
  const ref = data[2];
  const alias = data[3];

  return new ImportClause(data, ref, alias);
};

export const $as = (data: any): Identifier => {
  return data[3];
};

export const $reference = (data: any): Reference => {
  const ids = R.flatten(data[0]) as Identifier[];
  return new Reference(data, ids);
};

export const $identifier = ([identifer]: any): Identifier => {
  return new Identifier(identifer, identifer.value);
};

export const $exportableDefinition = (data: any) => {};

export const $functionDefinition = (data: any) => {
  // console.log(data);
};

export const $returnType = (data: any) => {
  return data[3];
};

export const $typeName = (data: any): Type => {
  const $type = data[0];
  return new Type(data, $type);
};

export const $arrowFunctionType = (data: any) => {
  console.log(pprint(data));
};

export const $typeDefinition = (data: any) => {
  return data[0][0];
};

export const $body = (data: any) => {};

export const $block = (data: any) => {};

export const $parameter = (data: any): Parameter => {
  const id = data[0];
  const type = data[1];

  return new Parameter(data, id, type);
};

export const $parameterList = (data: any) => {
  const params = data.slice(1, -1);
};
