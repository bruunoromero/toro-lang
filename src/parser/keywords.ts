import * as P from "parsimmon";
import { capitalize } from "../utils/strings";

const keyword = (word: string) => P.string(word).mark();

export const KEYWORDS = {
  AsKeyword: () => keyword("as"),
  IfKeyword: () => keyword("if"),
  FunKeyword: () => keyword("fun"),
  LetKeyword: () => keyword("let"),
  ElseKeyword: () => keyword("else"),
  DataKeyword: () => keyword("data"),
  AwaitKeyword: () => keyword("await"),
  ModuleKeyword: () => keyword("module"),
  ImportKeyword: () => keyword("import"),
  ExternKeyword: () => keyword("extern"),
  ExposingKeyword: () => keyword("exposing"),
  AsyncKeyword: () => keyword("async").map(() => true),
};
