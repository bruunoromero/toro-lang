import * as P from "parsimmon";

import { Language } from "parsimmon";

export const SPECIALS = {
  Comma: (r: Language) => P.string(",").mark(),
  Colon: (r: Language) => P.string(":").mark(),
  LParen: (r: Language) => P.string("(").mark(),
  RParen: (r: Language) => P.string(")").mark(),
  LBrace: (r: Language) => P.string("[").mark(),
  RBrace: (r: Language) => P.string("]").mark(),
  LCurly: (r: Language) => P.string("{").mark(),
  RCurly: (r: Language) => P.string("}").mark(),
  SemiColon: (r: Language) => P.string(";").mark(),
  end: (r: P.Language) => P.seq(P.optWhitespace, r.SemiColon, P.optWhitespace),
};
