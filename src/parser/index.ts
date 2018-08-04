import AggregateError from "aggregate-error";

import { AST } from "./ast";
import { IToken } from "chevrotain";
import { parser } from "./parser";
import { Visitor } from "./visitor";

export const parse = (tokens: IToken[]): AST => {
  parser.input = tokens;

  const ctx = parser.program();
  const visitor = new Visitor();

  if (parser.errors.length) {
    throw new AggregateError(parser.errors);
  }

  return visitor.visit(ctx);
};
