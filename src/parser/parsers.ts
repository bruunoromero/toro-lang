import * as R from "ramda";

import { Nil } from "../ast/nil";
import { If } from "./../ast/if";
import { Node } from "../ast/node";
import { List } from "./../ast/list";
import { Macro } from "../ast/macro";
import { Location } from "./location";
import { Block } from "./../ast/block";
import { Vector } from "../ast/vector";
import { Program } from "./../ast/program";
import { Primitive } from "../ast/primitive";
import { SymbolLiteral } from "../ast/symbol";
import { Definition } from "./../ast/definition";
import { BooleanLiteral } from "./../ast/boolean";
import { FunctionLiteral } from "../ast/function";

export const $program = ([program]: any): Program => {
  // console.log(program);
  return Program.create([]);
};

export const $symbol = ([symbol]: any): SymbolLiteral => {
  return new SymbolLiteral(Location.fromToken(symbol), symbol.value);
};

export const $true = ([bool]: any): BooleanLiteral => {
  return new BooleanLiteral(Location.fromToken(bool), true);
};

export const $false = ([bool]: any): BooleanLiteral => {
  return new BooleanLiteral(Location.fromToken(bool), false);
};

export const $nil = ([nil]: any): Nil => {
  return new Nil(Location.fromToken(nil));
};

export const $list = (clause: any): List => {
  const [, data] = clause;
  return new List(Location.fromClause(clause), R.flatten(data));
};

export const $vector = (clause: any): Vector => {
  const [, data] = clause;
  const exprs = R.flatten(data) as Primitive<any>[];
  return new Vector(Location.fromClause(clause), exprs.length, exprs);
};

export const $fn = (clause: any): FunctionLiteral => {
  const [, , params, data] = clause;

  return new FunctionLiteral(
    Location.fromClause(clause),
    params,
    R.flatten(data),
  );
};

export const $def = (clause: any): Definition => {
  const [, , identifier, data] = clause;

  return new Definition(
    Location.fromClause(clause),
    identifier,
    R.flatten(data),
  );
};

export const $defmacro = (clause: any): Macro => {
  const [, , identifier, params, data] = clause;

  return new Macro(
    Location.fromClause(clause),
    identifier,
    params,
    R.flatten(data),
  );
};

export const $defsyntax = (clause: any): Macro => {
  const [, , identifier, params, data] = clause;

  return new Macro(
    Location.fromClause(clause),
    identifier,
    params,
    R.flatten(data),
    true,
  );
};

export const $do = (clause: any): Block => {
  const [, , data] = clause;

  return new Block(Location.fromClause(clause), R.flatten(data));
};

export const $if = (clause: any): If => {
  const [, , data] = clause;
  return new If(Location.fromClause(clause), R.flatten(data));
};

export const $clause = ([clause]: any): Node => {
  return clause[0];
};
