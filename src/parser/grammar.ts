import * as P from "parsimmon";

const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1);

const keyword = (word: string) =>
  P.string(word).node(`${capitalize(word)}Keyword`);

export const Grammar = P.createLanguage({
  AsKeyword: () => keyword("as"),
  ModuleKeyword: () => keyword("module"),
  ExposingKeyword: () => keyword("exposing"),
  Identifier: () => P.regexp(/[a-zA-Z][a-zA-Z0-9]*/).node("Identifier"),
  ModuleDeclaration(r: P.Language) {
    return P.seq(
      r.ModuleKeyword.skip(P.whitespace),
      r.Identifier,
      P.end.or(P.whitespace.then(r.ExposingDeclaration)),
    );
  },
  ExposingDeclaration(r: P.Language) {
    return P.seq(
      r.ExposingKeyword.skip(P.optWhitespace),
      P.sepBy(r.Identifier, P.string(",")).wrap(P.string("("), P.string(")")),
      P.end,
    );
  },
});
