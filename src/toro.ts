import { Grammar } from "./parser/grammar";
import { pprint } from "./utils/print";

const sample = `
module Main.Teste exposing (Just)

import List as L exposing (create)
import List as L exposing (create)
import List as L exposing (create)

def a(teste: List(Int, 'a)) {a}
`;

const source = Grammar.File.parse(sample) as any;

console.log(source);
