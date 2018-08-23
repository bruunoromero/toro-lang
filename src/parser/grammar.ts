import { KEYWORDS } from "./keywords";
import * as R from "ramda";
import * as P from "parsimmon";

import { TOKENS } from "./tokens";
import { COMMON } from "./common";
import { CLAUSES } from "./clauses";
import { OPERATORS } from "./operators";
import { SPECIALS } from "./specials";

export const Grammar = P.createLanguage(
  R.mergeAll([OPERATORS, SPECIALS, KEYWORDS, TOKENS, COMMON, CLAUSES]),
);
