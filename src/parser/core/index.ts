import { Location } from "../location";
import { CharLiteral } from "../../ast/char";
import { StringLiteral } from "../../ast/string";
import { DoubleLiteral } from "../../ast/double";
import { Identifier } from "../../ast/identifier";
import { IntegerLiteral } from "../../ast/integer";

export const $integer = ([number]: any): IntegerLiteral => {
  return new IntegerLiteral(Location.fromToken(number), Number(number.value));
};

export const $double = ([number]: any): IntegerLiteral => {
  return new DoubleLiteral(Location.fromToken(number), Number(number.value));
};

export const $string = ([str]: any): StringLiteral => {
  return new StringLiteral(Location.fromToken(str), str.value);
};

export const $char = ([char]: any): CharLiteral => {
  return new CharLiteral(Location.fromToken(char), char.value);
};

export const $identifier = ([identifier]: any): Identifier => {
  return new Identifier(Location.fromToken(identifier), identifier.value);
};
