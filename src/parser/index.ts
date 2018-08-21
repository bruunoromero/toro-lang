import { Parser, Grammar } from "nearley";

import * as grammar from "./grammar";
import { unexpectedEndOfInput, ambiguityFound } from "../utils/errors";

const compiledGrammar = Grammar.fromCompiled(grammar);

export const parse = (source: string) => {
  const parser = new Parser(compiledGrammar);
  parser.feed(source);
  parser.finish();

  if (!parser.results.length) {
    unexpectedEndOfInput();
  }

  if (parser.results.length > 1) {
    ambiguityFound(parser.results.length);
  }

  return parser.results[0];
};
