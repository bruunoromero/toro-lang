import * as P from "parsimmon";

import { Language } from "parsimmon";

export const SPECIALS = {
  Comma: (r: Language) => P.string(",").node("Comma"),
  Colon: (r: Language) => P.string(":").node("Colon"),
  LParen: (r: Language) => P.string("(").node("LParen"),
  RParen: (r: Language) => P.string(")").node("RParen"),
  LBrace: (r: Language) => P.string("[").node("LBrace"),
  RBrace: (r: Language) => P.string("]").node("RBrace"),
  LCurly: (r: Language) => P.string("{").node("LCurly"),
  RCurly: (r: Language) => P.string("}").node("RCurly"),
};
