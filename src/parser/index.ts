import * as _ from "lodash";
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
    const messages = _.map(parser.errors, error => JSON.stringify(error));
    throw new AggregateError(messages);
  }

  return visitor.visit(ctx);
};
