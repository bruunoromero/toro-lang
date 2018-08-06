import { generateExpression } from "./expression";
import { generateFunction } from "./function";
import { BlockClause } from "./../ast/block-caluse";

export const generateBlock = (block: BlockClause) => {
  const defs = `
    ${Array.from(block.definitions)
      .map(([name, def]) => generateFunction(name, def.value))
      .join("\n")}
    `;

  const exps = Array.from(block.expressions).map(exp =>
    generateExpression(exp),
  );

  const last = exps[exps.length - 1];
  exps[exps.length - 1] = "return " + last;

  return `${defs}${exps}`;
};
