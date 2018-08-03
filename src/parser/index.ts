import { IToken } from "chevrotain";
import { parser } from "./parser";
import { Visitor } from "./visitor";

export const parse = (tokens: IToken[]) => {
  parser.input = tokens;

  const ctx = parser.importClause();
  const visitor = new Visitor();

  if (parser.errors.length) {
    parser.errors.forEach(error => {
      console.log(error);
    });

    throw Error("Parser error");
  }

  return visitor.visit(ctx);
};
