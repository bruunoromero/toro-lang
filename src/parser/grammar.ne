@{%
import { lexer } from './lexer'
import {
  $as,
  $body,
  $block,
  $import,
  $typeName,
  $reference,
  $parameter,
  $identifier,
  $atLeastOne,
  $parameterList,
  $typeDefinition,
  $arrowFunctionType,
  $functionDefinition,
  $exportableDefinition,
  $genericParameterList,
  $functionDefinitionParameters
} from './parsers'
%}

@preprocessor typescript

@builtin "postprocessors.ne"

@lexer lexer

### --- Macros --- ###

# Optional White space follwed by an optional Element and an optional White Space
optional[el]-> _ ($el _ {% nth(0) %}):? {% nth(1) %}

# Optional White space follwed by an optional Element and a mandatory White Space
optionalWithSpace[el] -> ($el __ {% nth(0) %}):? {% nth(0) %}

# Optional White space follwed by 2 sequences of an optional Element and an optional White Space
optional2[el1, el2]-> _ ($el1 _):? ($el2 _):?

# Optional White space follwed by sequences of an optional Elements separated by 
# an Optional White space, Comma and Optional White space
parameters[el] -> optional[delimited[$el {% nth(0) %},  _ %COMMA _] {% nth(0) %}] {% nth(0) %}

# Optional White space followed by an Element and an Optional White space,
# then an Optional sequences of Elements with an Separator
atLeastOne[el, sep] -> (_ $el _ {% nth(1) %}) ($sep _ delimited[$el {% nth(0) %}, _ $sep _] {% nth(2) %}):? {% $atLeastOne %}


### --- Main --- ###

# A program is a seqauences of imports separated by Lines,
# followed by exportable definitions separated by Lines
program -> delimited[import {% nth(0) %}, %NL]:? delimited[exportableDefinition {% nth(0) %}, %NL]:?

import -> _ ("import" __ reference as:? {% $import %}) _ {% nth(1) %}

as -> __ "as" __ identifier {% $as %}

exportableDefinition -> _ (optionalWithSpace["export"] definition {% $exportableDefinition %}) _ {% nth(1) %}


### -- Expressions -- ###

expression
  -> ifExpression
  |  matchExpression
  |  arithmeticExpression

arithmeticExpression -> pipeExpression

pipeExpression -> pipeExpression __ "|>" __ orExpression | orExpression

orExpression -> andExpression __ "||" __ orExpression | andExpression

andExpression -> comparasionExpression __ "&&" __ andExpression  | comparasionExpression

comparasionExpression 
  -> comparasionExpression __ ("==" | "!=" | "<" | ">" | "<=" | ">=") __ sumExpression 
  |  sumExpression

sumExpression -> sumExpression __ ("+" | "-") __ productExpression | productExpression

productExpression -> productExpression __ ("*" | "/") __ parenthesisExpression | parenthesisExpression

parenthesisExpression -> "(" _ expression _ ")" | atomicValues

arithmeticValues ->  %INTEGER | %DOUBLE

valueExpression -> reference (_ argumentList):?

stringLiteral -> %STRING

charLiteral -> %CHAR

recordValue -> identifier __ "=" __ expression

recordLiteral -> "{" atLeastOne[recordValue, %COMMA] "}"

listLiteral -> "[" parameters[expression] "]"

unaryExpression -> ("+" | "-" | "!"):? (arithmeticValues | valueExpression)

atomicValues
  -> unaryExpression
  |  stringLiteral
  |  charLiteral
  |  listLiteral
  |  recordLiteral
  |  arrowFunctionExpression

arrowFunctionExpression -> "(" parameters[optionalTypedParameter] ")" _ "=>" _ body

ifExpression -> "if" _ "(" _ expression _ ")" _ body _ "else" _ body

matchExpression -> "match" _ "(" _ expression _ ")" _ "{" delimited[_ matchClause _, %NL] "}"

matchClause -> expression __ "->" __ body


### -- Definitions  -- ###

unionName -> identifier optional[genericParameterList]

unionDefinition -> "type" __ unionName "=" atLeastOne[unionType, "|"]

unionType -> identifier ("(" atLeastOne[typeDefinition, %COMMA] ")"):?

constantDefinition -> "let" __ identifier returnType:? "=" _ body

functionDefinition -> ("def" __ identifier {% nth(2) %} ) optional[functionDefinitionParameters {% nth(0) %}] returnType:? ("=" _ body {% nth(2) %}) {% $functionDefinition %}

functionDefinitionParameters -> (parameterList | genericParameterList _ parameterList) {% $functionDefinitionParameters %}

definition 
  -> constantDefinition
  |  functionDefinition
  |  unionDefinition


### --- Type Definition --- ###

typeDefinition -> (typeName | arrowFunctionType) {% $typeDefinition %}

arrowFunctionType -> "(" parameters[typeName] ")" _ "=>" _ typeName {% $arrowFunctionType %}

typeName -> identifier optional["<" atLeastOne[typeDefinition, %COMMA] ">"] {% $typeName %}


### --- UTILS --- ###

identifier -> %IDENTIFIER {% $identifier %}

body -> (block | expression) {% $body %}

block -> "{" optional[delimited[(expression | definition) {% nth(0) %}, %NL]] "}" {% $block %}

genericParameterList -> "<" (atLeastOne[identifier {% nth(0) %}, %COMMA] {% $genericParameterList %}) ">" {% nth(1) %}

argumentList -> "(" parameters[arithmeticExpression] ")"

parameterList -> "(" (parameters[parameter {% nth(0) %}] {% $parameterList %}) ")" {% nth(1) %}

returnType -> _ ":" _ typeDefinition {% nth(3) %}

parameter -> identifier returnType {% $parameter %}

optionalTypedParameter -> identifier returnType:?

reference -> delimited[identifier {% nth(0) %},  _ %DOT _] {% $reference %}

_ -> (%WS | %NL):*
__ -> %WS:+