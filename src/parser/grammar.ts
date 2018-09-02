import * as R from "ramda";
import * as P from "parsimmon";

import { TYPES } from "./types";
import { COMMON } from "./common";
import { CLAUSES } from "./clauses";
import { KEYWORDS } from "./keywords";
import { SPECIALS } from "./specials";
import { OPERATORS } from "./operators";
import { PRIMITIVES } from "./primitives";
import { EXPRESSION } from "./expression";

export const Grammar = P.createLanguage(
  R.mergeAll([
    OPERATORS,
    SPECIALS,
    KEYWORDS,
    PRIMITIVES,
    COMMON,
    TYPES,
    EXPRESSION,
    CLAUSES,
  ]),
);
