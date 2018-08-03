import { parse } from "./parser";
import { tokenize } from "./lexer";

const example = `
import Console;
import Toro.Lexer;

def main = {
  def a = 10;
  Console.log("Ola mundo");
}
`;

const tokens = tokenize(example);
const ast = parse(tokens);
