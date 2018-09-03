import * as P from "parsimmon";

import { ListPattern } from "../ast/list";
import { CharPattern } from "../ast/char";
import { Location } from "../ast/location";
import { TuplePattern } from "../ast/tuple";
import { StringPattern } from "../ast/string";
import { DoublePattern } from "../ast/double";
import { ConcatPattern } from "../ast/pattern";
import { IntegerPattern } from "./../ast/integer";
import { ConstructorPattern } from "./../ast/union";

export const PATTERN = {
  Pattern: (r: P.Language) =>
    P.alt(
      r.CharPattern,
      r.ListPattern,
      r.Placeholder,
      r.TuplePattern,
      r.StringPattern,
      r.DoublePattern,
      r.IntegerPattern,
      r.ConstructorPattern,
    )
      .sepBy(P.string("::").trim(r.none))
      .trim(r.none)
      .mark()
      .map(({ start, end, value }) => {
        if (value.length > 1) {
          return new ConcatPattern(new Location(start, end), value);
        } else {
          return value[0];
        }
      }),

  PlaceholderPattern: (r: P.Language) => r.Placeholder.trim(r.none),

  ListPattern: (r: P.Language) =>
    r.Pattern.sepBy(r.Comma.trim(r.none))
      .wrap(r.LBrace.trim(r.none), r.RBrace.trim(r.none))
      .mark()
      .map(({ start, end, value }) => {
        return new ListPattern(new Location(start, end), value);
      }),

  TuplePattern: (r: P.Language) =>
    r.Pattern.sepBy1(r.Comma.trim(r.none))
      .wrap(r.LCurly.trim(r.none), r.RCurly.trim(r.none))
      .mark()
      .map(
        ({ start, end, value }) =>
          new TuplePattern(new Location(start, end), value),
      ),

  ConstructorPattern: (r: P.Language) =>
    P.seq(
      r.Reference,
      r.Pattern.sepBy1(r.Comma.trim(r.none))
        .wrap(r.LParen.trim(r.none), r.RParen.trim(r.none))
        .atMost(1),
    )
      .mark()
      .map(
        ({ start, end, value: [ref, [patterns]] }) =>
          new ConstructorPattern(new Location(start, end), ref, patterns),
      ),

  CharPattern: (r: P.Language) =>
    r.CharLiteral.map(char => new CharPattern(char)),

  StringPattern: (r: P.Language) =>
    r.StringLiteral.map(str => new StringPattern(str)),

  IntegerPattern: (r: P.Language) =>
    r.IntegerLiteral.map(int => new IntegerPattern(int)),

  DoublePattern: (r: P.Language) =>
    r.DoubleLiteral.map(doub => new DoublePattern(doub)),
};
