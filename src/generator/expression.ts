import { Block } from "../ast/block";
import { Double } from "../ast/double";
import { generateBlock } from "./block";
import { Integer } from "../ast/integer";
import { generateNumber } from "./number";
import { Expression } from "../ast/expression";

export const generateExpression = (exp: Expression | Block): any => {
  if (exp.is(Block)) {
    return generateBlock(exp as Block);
  } else {
    const expression = (exp as Expression).expression;
    if (expression.is(Integer)) {
      return `${generateNumber(expression as Integer)};`;
    } else if (expression.is(Double)) {
      return `${generateNumber(expression as Double)};`;
    }
  }
};
