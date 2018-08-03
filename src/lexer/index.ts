import * as _ from "lodash";
import { Lexer } from "chevrotain";

import { LITERALS } from "./literals";
import { KEYWORDS } from "./keywords";
import { SPECIALS } from "./specials";
import { OPERATORS } from "./operators";

export const TOKENS = _.concat(SPECIALS, OPERATORS, KEYWORDS, LITERALS);

const LEXER = new Lexer(TOKENS);

export const tokenize = (input: string) => {
  const output = LEXER.tokenize(input);

  if (output.errors.length) {
    output.errors.forEach(error => {
      console.log(error);
    });

    throw Error("Tokenization error");
  }

  return output.tokens;
};
