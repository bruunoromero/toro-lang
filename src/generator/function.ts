import { generateExpression } from "./expression";
import { FunctionClause } from "../ast/function-clause";

export const generateFunction = (name: string, func: FunctionClause) => {
  return `
    function ${name}(${generateParameters(func)}) {
        ${generateExpression(func.value)}
    }
    `;
};

const generateParameters = (func: FunctionClause) => {
  if (func.parameters.size) {
    return Array.from(func.parameters)
      .map(([name, type]) => name)
      .join(", ");
  }

  return "";
};
