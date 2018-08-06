import { generateFunction } from "./function";
import * as _ from "lodash";

import { AST } from "../ast";

export const generate = (ast: AST) => {
  return `
    ${Array.from(ast.definitions)
      .map(([name, def]) => generateFunction(name, def.value))
      .join("\n")}
    `;
};
