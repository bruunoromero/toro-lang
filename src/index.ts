import { parse } from "./parser";
import { tokenize } from "./lexer";

const example = `
import Console;
import Toro.Lexer;

def main = { "ola"; }
`;

const tokens = tokenize(example);
const ast = parse(tokens);
console.log(ast.definitions[0].expressions);
