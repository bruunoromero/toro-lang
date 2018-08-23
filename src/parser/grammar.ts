import * as R from "ramda";
import * as P from "parsimmon";

import { TOKENS } from "./tokens";
import { COMMON } from "./common";
import { CLAUSES } from "./clauses";
import { KEYWORDS } from "./keywords";
import { SPECIALS } from "./specials";
import { OPERATORS } from "./operators";

export const Grammar = P.createLanguage(
  R.mergeAll([OPERATORS, SPECIALS, KEYWORDS, TOKENS, COMMON, CLAUSES]),
);
