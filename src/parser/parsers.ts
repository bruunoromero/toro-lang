import { FunctionDefinition } from "./../untyped-ast/function-definition";
import { Parameter } from "./../untyped-ast/parameter";
import { Type } from "./../untyped-ast/type";
import * as R from "ramda";
import { Import } from "../untyped-ast/import";
import { pprint } from "../utils/print";
import { Identifier } from "../untyped-ast/identifier";
import { Reference } from "../untyped-ast/reference";
import { FunctionParameters } from "../untyped-ast/function-parameters";

export const $import = (data: any): Import => {
  const ref = data[2];
  const alias = data[3];

  return new Import(data, ref, alias);
};

export const $as = (data: any): Identifier => {
  return data[3];
};

export const $reference = (data: any) => {
  return new Reference(data, data[0]);
};

export const $identifier = ([identifer]: any): Identifier => {
  return new Identifier(identifer, identifer.value);
};

export const $exportableDefinition = (data: any) => {};

export const $functionDefinition = (data: any) => {
  const id = data[0];
  const parameters = data[1];
  console.log(data);
  return new FunctionDefinition(id, parameters, []);
};

export const $typeName = (data: any): Type => {
  const $type = data[0];
  return new Type($type);
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
  return data[0] || [];
  // console.log(data);
  // return params[0];
};

export const $functionDefinitionParameters = (
  data: any,
): FunctionParameters => {
  if (data[0].length === 1) {
    const parameters = data[0][0];
    return new FunctionParameters(parameters);
  } else if (data[0].length === 3) {
    const generics = data[0][0];
    const parameters = data[0][2];
    return new FunctionParameters(parameters, generics);
  }

  throw new Error("could not parse");
};

export const $genericParameterList = (data: any) => {
  const types = data[0] || [];
  return types.map((type: Identifier) => new Type(type, false));
};

export const $atLeastOne = (data: any) => {
  return R.flatten(data).filter(R.identity);
};

export const $sep = (data: any) => {
  // return cop
};
