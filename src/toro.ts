import { RecordUpdate } from "./ast/record";
import { Grammar } from "./parser/grammar";

const sample = `
module Main.Teste exposing (Just)

extern "./core" as Core

import List as L exposing (create)
import List as L exposing (create)
import List as L exposing (create)

let a = (teste: List(Int('b), 'a), t:'a) => { a }
`;

const source = Grammar.Expression.parse(
  `{ x | teste = 20, tt = [1, 2, 3] }.tt`,
) as any;

console.log(source.value.left.properties);
