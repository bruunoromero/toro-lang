import * as P from "parsimmon";

const keyword = (word: string) => P.string(word).mark();

export const KEYWORDS = {
  AsKeyword: () => keyword("as"),
  IfKeyword: () => keyword("if"),
  FunKeyword: () => keyword("fun"),
  ElseKeyword: () => keyword("else"),
  DataKeyword: () => keyword("data"),
  TypeKeyword: () => keyword("type"),
  AwaitKeyword: () => keyword("await"),
  ModuleKeyword: () => keyword("module"),
  ImportKeyword: () => keyword("import"),
  ExternKeyword: () => keyword("extern"),
  ExposingKeyword: () => keyword("exposing"),
  LetKeyword: () => keyword("let").map(() => true),
  MutKeyword: () => keyword("mut").map(() => true),
  RecKeyword: () => keyword("rec").map(() => "rec"),
  AsyncKeyword: () => keyword("async").map(() => "async"),
};
