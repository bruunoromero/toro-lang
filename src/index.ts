import * as fs from "fs";
import { LEXER } from "./lexer";

const toro = `
def main = {}
`;

const tokens = LEXER.tokenize(toro);

console.log(tokens);
