import * as _ from "lodash";
import { Lexer } from "chevrotain";

import { LITERALS } from "./literals";
import { KEYWORDS } from "./keywords";
import { SPECIALS } from "./specials";

const TOKENS = _.concat(SPECIALS, KEYWORDS, LITERALS);

export const LEXER = new Lexer(TOKENS);
