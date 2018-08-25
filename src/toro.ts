import { Grammar } from "./parser/grammar";
import { pprint } from "./utils/print";

const sample = `
module Main.Teste exposing (Just)

import List as L exposing (create)
import List as L exposing (create)
import List as L exposing (create)

def a (teste: List(Int('b), 'a), t:'a) {a}
`;

const source = Grammar.Expression.parse("7 - 3 - 2") as any;
console.log(source.value);
