import { Grammar } from "./parser/grammar";

const sample = `
module Main.Teste exposing (Just)

import List as L exposing (create)
import List as L exposing (create)
import List as L exposing (create)

let a = (teste: List(Int('b), 'a), t:'a) => { a }
`;

const source = Grammar.Expression.parse(`
  let a: Int = 
    () => { let b = 20 }
`) as any;
console.log(source);
