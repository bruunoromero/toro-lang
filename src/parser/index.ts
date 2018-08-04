import { AST } from "./ast";
import { IToken } from "chevrotain";
import { parser } from "./parser";
import { Visitor } from "./visitor";

export const parse = (tokens: IToken[]): AST => {
  parser.input = tokens;

  const ctx = parser.program();
  const visitor = new Visitor();

  if (parser.errors.length) {
    console.log(parser.errors[0]);

    // throw Error("Parser error");
  }

  return visitor.visit(ctx);
};
