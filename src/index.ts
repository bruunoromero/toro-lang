import { parse } from "./parser";
import { tokenize } from "./lexer";

const example = `import DOM`;

const tokens = tokenize(example);
const ast = parse(tokens);

console.log(ast);
