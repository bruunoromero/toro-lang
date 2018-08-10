@{%
import { lexer } from './lexer'
%}

@preprocessor typescript
@builtin "postprocessors.ne"

@lexer lexer

optional[el]-> _ ($el _):?
optionalWithSpace[el] -> _ ($el __):?
optional2[el1, el2]-> _ ($el1 _):? ($el2 _):?
parameters[el] -> optional[delimited[$el,  _ %COMMA _]]
atLeastOne[el, sep] -> _ $el _ ($sep _ delimited[$el, _ $sep _] _):?


program -> delimited[import, %NL]:? delimited[exportableDefinition, %NL]:?

import -> _ "import" __ reference _

exportableDefinition -> optionalWithSpace["export"]  definition _

definition -> "def" __ %IDENTIFIER optional[(parameterList | typeParameter _ parameterList)]  "=" _ (block | expression)

ifExpression -> "if" _ "(" optional[booleanExpression] ")" _ block _ "else" _ block

block -> "{" optional[delimited[expression, %NL]] "}"

expression 
  -> definition 
  |  ifExpression
  |  booleanExpression
  |  functionCall

functionCall -> reference _ "(" parameters[expression] ")"

booleanExpression -> booleanValues

booleanValues 
  -> "true" 
  |  "false"

typeParameter -> "<" atLeastOne[%IDENTIFIER, %COMMA] ">"

parameterList -> "(" parameters[parameter]  ")"

parameter -> %IDENTIFIER _ ":" _ %IDENTIFIER

reference -> delimited[%IDENTIFIER,  _ %DOT _]

_ -> (%WS | %NL):*
__ -> %WS:+