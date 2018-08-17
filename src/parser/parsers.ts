import { Multiplication, Division } from "./../untyped-ast/operators";
import { Call } from "./../untyped-ast/call";
import { FunctionDefinition } from "./../untyped-ast/function-definition";
import { Parameter } from "./../untyped-ast/parameter";
import { Type } from "./../untyped-ast/type";
import * as R from "ramda";
import { Import } from "../untyped-ast/import";
import { pprint } from "../utils/print";
import { Identifier } from "../untyped-ast/identifier";
import { Reference } from "../untyped-ast/reference";
import { FunctionParameters } from "../untyped-ast/function-parameters";
import { Integer, Double } from "../untyped-ast/primitives";
import { UnarySubtraction } from "../untyped-ast/operators";

export const $import = (data: any): Import => {
  const ref = data[0];
  const alias = data[1];

  return new Import(ref, alias);
};

export const $reference = (data: any) => {
  return new Reference(data[0]);
};

export const $identifier = ([identifer]: any): Identifier => {
  return new Identifier(identifer, identifer.value);
};

export const $exportableDefinition = (data: any) => {};

export const $functionDefinition = (data: any) => {
  const id = data[0];
  const parameters = data[1];
  // console.log(data);
  return new FunctionDefinition(id, parameters, []);
};

export const $typeName = (data: any): Type => {
  const $type = data[0];
  return new Type($type);
};

export const $arrowFunctionType = (data: any) => {
  // console.log(pprint(data));
};

export const $typeDefinition = (data: any) => {
  return data[0][0];
};

export const $body = (data: any) => {};

export const $block = (data: any) => {
  return data.map(R.identity);
};

export const $parameter = (data: any): Parameter => {
  const id = data[0];
  const type = data[1];
  return new Parameter(id, type);
};

export const $parameterList = (data: any) => {
  return data[0] || [];
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
  return types.map((type: Identifier) => new Type(type));
};

export const $atLeastOne = (data: any): any[] => {
  return R.flatten(data).filter(R.identity);
};

export const $integer = ([integer]: any): Double => {
  const value = parseInt(integer.value, 10);
  return new Integer(integer, value);
};

export const $double = ([double]: any): Double => {
  const value = parseFloat(double.value);
  return new Double(double, value);
};

export const $string = ([str]: any) => {};

export const $unaryExpression = ([exp]: any) => {
  const operator = exp[0];
  const value = exp[1];

  if (operator) return new UnarySubtraction(operator, value);

  return value;
};

export const $callExpression = ([ref, args]: any) => {
  return new Call(ref, args);
};

export const $argumentList = (data: any) => {
  // console.log(data);
};

export const $pipeExpression = (data: any) => {
  // console.log(data);
};

export const $arithmeticExpression = (data: any) => {};

export const $orExpression = (data: any) => {};

export const $andExpression = (data: any) => {};

export const $comparasionExpression = (data: any) => {};

export const $sumExpression = (data: any) => {};

export const $arithmeticValues = (data: any) => {
  return data[0][0];
};

export const $productExpression = ([exp]: any) => {
  if (exp.length === 1) {
    return exp[0];
  }

  const operator = exp[2][0];
  const left = exp[0][0];
  const right = exp[4][0];

  operator.left = left;
  operator.right = right;

  return operator;
};

export const $uminus = ([ctx]: any) => {
  return new UnarySubtraction(ctx);
};

export const $mult = ([exp]: any) => {
  return new Multiplication(exp);
};

export const $div = ([exp]: any) => {
  return new Division(exp);
};

export const $parenthesisExpression = ([exp]: any) => {
  if (exp.length === 1) {
    return exp[0];
  }

  return exp[2][0];
};
