import { parse } from "./parser";
import { tokenize } from "./lexer";
import { pprint } from "./utils/print";

const example = `
export def main<T>(xs: List<T>): Int = { 
    10 + 100;
}
`;

const tokens = tokenize(example);
const cst = parse(tokens);
