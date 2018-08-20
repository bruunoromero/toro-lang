import * as R from "ramda";

import { Nil } from "../ast/nil";
import { If } from "./../ast/if";
import { List } from "./../ast/list";
import { Macro } from "../ast/macro";
import { Block } from "./../ast/block";
import { Vector } from "../ast/vector";
import { Primitive } from "../ast/primitive";
import { SymbolLiteral } from "../ast/symbol";
import { Identifier } from "../ast/identifier";
import { StringLiteral } from "./../ast/string";
import { NumberLiteral } from "./../ast/number";
import { Definition } from "./../ast/definition";
import { BooleanLiteral } from "./../ast/boolean";
import { FunctionLiteral } from "../ast/function";

export const $program = (data: any) => {};

export const $string = ([str]: any): StringLiteral => {
  return new StringLiteral(str, str.value);
};

export const $identifier = ([identifier]: any): Identifier => {
  return new Identifier(identifier, identifier.value);
};

export const $number = ([number]: any): NumberLiteral => {
  return new NumberLiteral(number, Number(number.value));
};

export const $symbol = ([symbol]: any): SymbolLiteral => {
  return new SymbolLiteral(symbol, symbol.value);
};

export const $true = ([bool]: any): BooleanLiteral => {
  return new BooleanLiteral(bool, true);
};

export const $false = ([bool]: any): BooleanLiteral => {
  return new BooleanLiteral(bool, false);
};

export const $nil = ([nil]: any): Nil => {
  return new Nil(nil);
};

export const $list = ([, data]: any): List => {
  return new List(R.flatten(data));
};

export const $vector = ([, data]: any): Vector => {
  const exprs = R.flatten(data) as Primitive<any>[];
  return new Vector(exprs.length, exprs);
};

export const $fn = ([, , params, data]: any): FunctionLiteral => {
  return new FunctionLiteral(params, R.flatten(data));
};

export const $def = ([, , identifier, data]: any): Definition => {
  return new Definition(identifier, R.flatten(data));
};

export const $defmacro = ([, , identifier, params, data]: any): Macro => {
  return new Macro(identifier, params, R.flatten(data));
};

export const $defsyntax = ([, , identifier, params, data]: any): Macro => {
  return new Macro(identifier, params, R.flatten(data), true);
};

export const $do = ([, , data]: any): Block => {
  return new Block(R.flatten(data));
};

export const $if = ([, , data]: any): If => {
  return new If(R.flatten(data));
};
