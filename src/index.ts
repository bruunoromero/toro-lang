import * as fs from "fs";
import { tokenize } from "./lexer";

const example = `
import IO
import List

# All functions in \`toro\` are curried
#
# List.map : (a -> b) -> [a] -> [b]

def map(list: List of Int): List of Double = {
  List.map(it * 2.2, list)
}

def main = {
    def list = [1, 2, 3, 4]
    def output = map(list)
    IO.print(output)
}
`;

const output = tokenize(example);

output.tokens.forEach(token =>
  console.log(token.image, token.tokenType!!.tokenName),
);
