import { parse } from "./parser";
import { tokenize } from "./lexer";

const example = `
import Console;
import Toro.Lexer;

def main = 10 * (20 + 10) + call();
`;

const tokens = tokenize(example);
const ast = parse(tokens);
