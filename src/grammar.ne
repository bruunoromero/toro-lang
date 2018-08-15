@{%
import { lexer } from './lexer'
%}

@preprocessor typescript

@builtin "number.ne"
@builtin "postprocessors.ne"

@lexer lexer

# Optional White space follwed by an optional Element and an optional White Space
optional[el]-> _ ($el _):?

# Optional White space follwed by an optional Element and a mandatory White Space
optionalWithSpace[el] -> _ ($el __):?

# Optional White space follwed by 2 sequences of an optional Element and an optional White Space
optional2[el1, el2]-> _ ($el1 _):? ($el2 _):?

# Optional White space follwed by sequences of an optional Elements separates by 
# an Optional White space, Comma and Optional White space
parameters[el] -> optional[delimited[$el,  _ %COMMA _]]

# Optional White space followed by an Element and an Optional White space,
# then an Optional sequences of Elements with an Separator
atLeastOne[el, sep] -> _ $el _ ($sep _ delimited[$el, _ $sep _] _):?

# A program is a seqauences of imports separated by Lines,
# followed by exportable definitions separated by Lines
program -> delimited[import, %NL]:? delimited[exportableDefinition, %NL]:?

import -> _ "import" __ reference _

exportableDefinition -> optionalWithSpace["export"]  definition _

definition -> "def" __ %IDENTIFIER optional[(parameterList | typeParameter _ parameterList)]  "=" _ (block | expression)

ifExpression -> "if" _ "(" optional[expression] ")" _ block _ "else" _ block

block -> "{" optional[delimited[expression, %NL]] "}"

expression 
  -> definition 
  |  ifExpression
  |  arithmeticExpression
  |  functionCall

functionCall -> reference _ "(" parameters[expression] ")"

arithmeticExpression -> logicalExpression

logicalExpression -> "!":? expression __ ("==" | "!=" | "&&" | "||") __ expression | sumExpression

sumExpression -> sumExpression __ ("+" | "-") __ productExpression | productExpression

productExpression -> productExpression __ ("*" | "/") __ parenthesisExpression | parenthesisExpression

parenthesisExpression -> "(" _ expression _ ")" | arithmeticValues | booleanValues

arithmeticValues -> ("+" | "-"):? %INTEGER | %DOUBLE

booleanValues 
  -> "true" 
  |  "false"

typeParameter -> "<" atLeastOne[%IDENTIFIER, %COMMA] ">"

parameterList -> "(" parameters[parameter]  ")"

parameter -> %IDENTIFIER _ ":" _ %IDENTIFIER

reference -> delimited[%IDENTIFIER,  _ %DOT _]

_ -> (%WS | %NL):*
__ -> %WS:+