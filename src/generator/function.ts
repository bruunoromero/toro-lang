import { generateExpression } from "./expression";
import { FunctionLiteral } from "../ast/function-literal";

export const generateFunction = (name: string, func: FunctionLiteral) => {
  return `
function ${name}(${generateParameters(func)}) {
  ${generateExpression(func.value)}
}
    `;
};

const generateParameters = (func: FunctionLiteral) => {
  if (func.parameters.size) {
    return Array.from(func.parameters)
      .map(([name, type]) => name)
      .join(", ");
  }

  return "";
};
