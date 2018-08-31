import * as P from "parsimmon";
import { capitalize } from "../utils/strings";

const keyword = (word: string) =>
  P.string(word).node(`${capitalize(word)}Keyword`);

export const KEYWORDS = {
  AsKeyword: () => keyword("as"),
  DefKeyword: () => keyword("def"),
  LetKeyword: () => keyword("let"),
  AsyncKeyword: () => keyword("async"),
  ModuleKeyword: () => keyword("module"),
  ImportKeyword: () => keyword("import"),
  ExposingKeyword: () => keyword("exposing"),
};
