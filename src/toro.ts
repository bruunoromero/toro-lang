import { Grammar } from "./parser/grammar";

const sample = `
module Main.Teste exposing (Just)

import List as L exposing (create)
import List as L exposing (create)
import List as L exposing (create)

def a (teste: List(Int('b), 'a), t:'a) {a}
`;

const source = Grammar.Expression.parse("teste.t 10") as any;
console.log(source);
