import * as _ from "lodash";
import { IToken } from "chevrotain";
import AggregateError from "aggregate-error";

import { AST } from "../ast";
import { PARSER } from "./parser";
import { Visitor } from "./visitor";

export const parse = (tokens: IToken[]): AST => {
  PARSER.input = tokens;

  const ctx = PARSER.program();
  const visitor = new Visitor();

  if (PARSER.errors.length) {
    const messages = _.map(PARSER.errors, error => JSON.stringify(error));
    throw new AggregateError(messages);
  }

  return visitor.visit(ctx);
};
