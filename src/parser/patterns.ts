import { IntegerPattern } from "./../ast/integer";
import * as R from "ramda";
import * as P from "parsimmon";

import { ListPattern } from "../ast/list";
import { Location } from "../ast/location";
import { TuplePattern } from "../ast/tuple";
import { StringPattern } from "../ast/string";
import { ConcatPattern } from "../ast/pattern";
import { DoublePattern } from "../ast/double";
import { IdentifierPattern } from "../ast/identifier";

export const PATTERN = {
  Pattern: (r: P.Language) => P.alt(r.ListPattern).trim(r.none),

  ListPattern: (r: P.Language) =>
    r.Pattern.sepBy(r.Comma.trim(r.none))
      .wrap(r.LBrace.trim(r.none), r.RBrace.trim(r.none))
      .mark()
      .map(
        ({ start, end, value }) =>
          new ListPattern(new Location(start, end), value),
      ),

  ConcatPattern: (r: P.Language) =>
    P.seq(
      r.Pattern.skip(P.string("::").trim(r.none)),
      r.Pattern.sepBy1(P.string("::").trim(r.none)),
    )
      .mark()
      .map(
        ({ start, end, value: [first, rest] }) =>
          new ConcatPattern(new Location(start, end), R.insert(0, first, rest)),
      ),

  TuplePattern: (r: P.Language) =>
    r.Pattern.sepBy1(r.Comma.trim(r.none))
      .wrap(r.LCurly.trim(r.none), r.RCurly.trim(r.none))
      .mark()
      .map(
        ({ start, end, value }) =>
          new TuplePattern(new Location(start, end), value),
      ),

  IdentifierPattern: (r: P.Language) =>
    r.Identifier.map(id => new IdentifierPattern(id)),

  StringPattern: (r: P.Language) =>
    r.StringLiteral.map(str => new StringPattern(str)),

  IntegerPattern: (r: P.Language) =>
    r.IntegerLiteral.map(int => new IntegerPattern(int)),

  DoublePattern: (r: P.Language) =>
    r.IntegerLiteral.map(doub => new DoublePattern(doub)),
};
