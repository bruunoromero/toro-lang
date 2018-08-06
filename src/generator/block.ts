import { generateExpression } from "./expression";
import { generateFunction } from "./function";
import { Block } from "../ast/block";

export const generateBlock = (block: Block) => {
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
