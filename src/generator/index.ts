import { AST } from "../ast";
import { generateExports } from "./exports";
import { generateFunction } from "./function";

export const generate = (ast: AST) => {
  const defs = Array.from(ast.definitions);

  return `
    'use strict';
    ${defs
      .map(([name, def]) => generateFunction(name, def.value))
      .filter(v => v)
      .join("\n")}
      
    ${ast.exports.map(name => generateExports(name)).join("\n")}
    `;
};
