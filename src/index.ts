import { parse } from "./parser";
import { tokenize } from "./lexer";

const example = `
import Console;
import Toro.Lexer;

def main = -10 + 20 * -5;
`;

const tokens = tokenize(example);
const ast = parse(tokens);
console.log(ast.definitions.get("main"));
