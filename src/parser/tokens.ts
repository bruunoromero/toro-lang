import * as P from "parsimmon";

import { Location } from "./location";
import { Identifier } from "../ast/identifier";

export const TOKENS = {
  _: () => P.regexp(/ */),

  end: (r: P.Language) => P.seq(r._, P.end),

  Identifier: () =>
    P.regexp(/[a-zA-Z][a-zA-Z0-9]*/)
      .node("Identifier")
      .map(id => new Identifier(Location.fromToken(id), id.value)),

  Generic: () =>
    P.regexp(/'[a-z]/)
      .node("Generic")
      .map(id => new Identifier(Location.fromToken(id), id.value.slice(1))),
};
