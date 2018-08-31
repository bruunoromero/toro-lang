import * as P from "parsimmon";

import { Language } from "parsimmon";

export const SPECIALS = {
  opt: (r: Language) => P.optWhitespace,
  end: (r: P.Language) => r._.skip(P.end),
  _: (r: Language) => P.regex(/ */).or(r.Comment),
  Comma: (r: Language) => P.string(",").mark(),
  Colon: (r: Language) => P.string(":").mark(),
  LParen: (r: Language) => P.string("(").mark(),
  RParen: (r: Language) => P.string(")").mark(),
  LBrace: (r: Language) => P.string("[").mark(),
  RBrace: (r: Language) => P.string("]").mark(),
  LCurly: (r: Language) => P.string("{").mark(),
  RCurly: (r: Language) => P.string("}").mark(),
  SemiColon: (r: Language) => P.string(";").mark(),
  Comment: (r: P.Language) =>
    P.string("#")
      .then(P.any)
      .chain(() =>
        P.takeWhile(c => {
          try {
            P.end.tryParse(c);
            return false;
          } catch (e) {
            return true;
          }
        }),
      ),
};
