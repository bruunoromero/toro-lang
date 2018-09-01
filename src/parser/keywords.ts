import * as P from "parsimmon";
import { capitalize } from "../utils/strings";

const keyword = (word: string) =>
  P.string(word).node(`${capitalize(word)}Keyword`);

export const KEYWORDS = {
  AsKeyword: () => keyword("as"),
  FunKeyword: () => keyword("fun"),
  LetKeyword: () => keyword("let"),
  AwaitKeyword: () => keyword("await"),
  ModuleKeyword: () => keyword("module"),
  ImportKeyword: () => keyword("import"),
  ExposingKeyword: () => keyword("exposing"),
  AsyncKeyword: () => keyword("async").map(() => true),
};
