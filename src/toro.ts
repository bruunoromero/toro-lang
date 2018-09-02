import { Grammar } from "./parser/grammar";

const sample = `
module Main.Teste exposing (Just)

extern "./core" as Core

import List as L exposing (create)
import List as L exposing (create)
import List as L exposing (create)

let a = (teste: List(Int('b), 'a), t:'a) => { a }
`;

const source = Grammar.Definition.parse(
  `type A('a, 'b) = Teste({String}, 'a)`,
) as any;
