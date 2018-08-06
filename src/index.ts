import { generate } from "./generator";
import { parse } from "./parser";
import { tokenize } from "./lexer";

const example = `
def greet(to: String) = {
    String.concat("Hello ", to);
}

def main = greet("world!");
`;

const tokens = tokenize(example);
const ast = parse(tokens);
console.log(generate(ast));
