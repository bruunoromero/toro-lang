import * as _ from "lodash";
import { Lexer, IToken } from "chevrotain";
import AggregateError from "aggregate-error";

import { LITERALS } from "./literals";
import { KEYWORDS } from "./keywords";
import { SPECIALS } from "./specials";
import { OPERATORS } from "./operators";

export const TOKENS = _.concat(SPECIALS, OPERATORS, KEYWORDS, LITERALS);

const LEXER = new Lexer(TOKENS);

export const tokenize = (input: string): IToken[] => {
  const output = LEXER.tokenize(input);

  if (output.errors.length) {
    throw new AggregateError(output.errors);
  }

  return output.tokens;
};
