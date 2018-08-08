import { IToken } from "chevrotain";
import AggregateError from "aggregate-error";

import { PARSER } from "./parser";
import { pprint } from "../utils/print";

export const parse = (tokens: IToken[]) => {
  PARSER.input = tokens;

  const ctx = PARSER.program();

  if (PARSER.errors.length) {
    const messages = PARSER.errors.map(pprint);
    throw new AggregateError(messages);
  }

  return ctx;
};
