import * as P from "parsimmon";
import { capitalize } from "../utils/strings";

const keyword = (word: string) =>
  P.string(word).node(`${capitalize(word)}Keyword`);

export const KEYWORDS = {
  AsKeyword: () => keyword("as"),
  DefKeyword: () => keyword("def"),
  ModuleKeyword: () => keyword("module"),
  ImportKeyword: () => keyword("import"),
  ExposingKeyword: () => keyword("exposing"),
};
