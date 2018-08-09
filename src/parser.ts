import { Parser, Grammar } from "nearley";
import * as grammar from "./grammar.js";

const compiledGrammar = Grammar.fromCompiled(grammar);

export const parse = (source: string) => {
  const parser = new Parser(compiledGrammar);
  parser.feed(source);
  return parser.results;
};
