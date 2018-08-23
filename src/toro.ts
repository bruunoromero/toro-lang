import { Grammar } from "./parser/grammar";
import { pprint } from "./utils/print";

const sample = `module Main exposing (Just)`;

console.log(pprint(Grammar.ModuleDeclaration.parse(sample)));
