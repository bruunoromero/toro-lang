import { generateBlock } from "./block";
import { BlockClause } from "./../ast/block-caluse";
import { StringClause } from "./../ast/string-clause";
import { generateNumber } from "./number";
import { DoubleClause } from "../ast/double-clause";
import { IntegerClause } from "../ast/integer-clause";
import { ExpressionClause } from "../ast/expression-clause";
import { generateString } from "./string";

export const generateExpression = (
  exp: ExpressionClause | BlockClause,
): any => {
  if (exp.is(BlockClause)) {
    return generateBlock(exp as BlockClause);
  } else {
    const expression = (exp as ExpressionClause).expression;
    if (expression.is(IntegerClause)) {
      return `${generateNumber(expression as IntegerClause)};`;
    } else if (expression.is(DoubleClause)) {
      return `${generateNumber(expression as DoubleClause)};`;
    } else if (expression.is(StringClause)) {
      return `${generateString(expression as StringClause)};`;
    }
  }
};
