import { parse } from "./parser";
import { tokenize } from "./lexer";

const example = `
export def main<T>(xs: List<T>): Int = { 
    10;
}
`;

const tokens = tokenize(example);
const ast = parse(tokens);
console.log(ast.definitions.get("main"));
