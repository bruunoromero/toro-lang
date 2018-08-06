import { generate } from "./generator";
import { parse } from "./parser";
import { tokenize } from "./lexer";

const example = `
def greet(to: Int) = {
    to;
}

export def main = greet(10);
`;

const tokens = tokenize(example);
const ast = parse(tokens);
console.log(generate(ast));
