import * as P from "parsimmon";

import { Language } from "parsimmon";

export const SPECIALS = {
  _: (r: Language) => P.regex(/ */),
  NotNewline: () => P.regexp(/[^\n]*/),
  end: (r: P.Language) => r._.skip(P.end),
  Comma: (r: Language) => P.string(",").mark(),
  Colon: (r: Language) => P.string(":").mark(),
  LParen: (r: Language) => P.string("(").mark(),
  RParen: (r: Language) => P.string(")").mark(),
  LBrace: (r: Language) => P.string("[").mark(),
  RBrace: (r: Language) => P.string("]").mark(),
  LCurly: (r: Language) => P.string("{").mark(),
  RCurly: (r: Language) => P.string("}").mark(),
  SemiColon: (r: Language) => P.string(";").mark(),
  Comment: (r: Language) => P.string("#").skip(r.NotNewline),
  none: (r: Language) => P.alt(P.regex(/\s/), r.Comment).many(),
};
