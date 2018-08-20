import { NumberLiteral } from "./../ast/number";
import { Identifier } from "../ast/identifier";

export const $string = (data: any) => {
  // console.log(data);
};
export const $identifier = ([identifier]: any): Identifier => {
  return new Identifier(identifier, identifier.value);
};

export const $number = ([number]: any) => {
  return new NumberLiteral(number, Number(number.value));
};

export const $symbol = ([symbol]: any) => {
  console.log(symbol);
};
export const $boolean = ([bool]: any) => {
  console.log(bool);
};
export const $nil = (data: any) => {};
