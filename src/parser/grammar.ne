@{%
import { lexer } from './lexer'
%}

@preprocessor typescript

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

import -> _ (("import" __ reference {% nth(2) %}) as:? {% $import %}) _ {% nth(1) %}

as -> __ "as" __ identifier {% nth(3) %}

exportableDefinition -> _ (optionalWithSpace["export"] definition {% $exportableDefinition %}) _ {% nth(1) %}


### -- Expressions -- ###

expression
  -> ifExpression
  |  matchExpression
  |  arithmeticExpression

arithmeticExpression -> pipeExpression {% $arithmeticExpression %}

pipeExpression -> (pipeExpression _ "|>" _ orExpression | orExpression) {% $pipeExpression %}

orExpression -> (andExpression _ "||" _ orExpression | andExpression) {% $orExpression %}

andExpression -> (comparasionExpression _ "&&" _ andExpression | comparasionExpression) {% $andExpression %}

comparasionExpression 
  -> (comparasionExpression _ ("==" | "!=" | "<" | ">" | "<=" | ">=") _ sumExpression | sumExpression) {% $comparasionExpression %}

sumExpression -> (sumExpression _ ("+" | "-") _ productExpression | productExpression) {% $sumExpression %}

productExpression -> (productExpression _ (mult | div) _ parenthesisExpression | parenthesisExpression) {% $productExpression %}

parenthesisExpression -> ("(" _ expression _ ")" | atomicValues) {% $parenthesisExpression %}

arithmeticValues ->  (integer | double) {% $arithmeticValues %}

callExpression -> reference (_ argumentList {% nth(1) %} ):? {% $callExpression %}

recordValue -> (identifier _ {% nth(0) %}) "=" (_ expression {% nth(1) %})

recordLiteral -> "{" atLeastOne[recordValue {% nth(0) %}, %COMMA] "}"

unaryExpression -> ("-":? arithmeticValues | callExpression) {% $unaryExpression %}

atomicValues
  -> char
  |  list
  |  string
  |  recordLiteral
  |  unaryExpression
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

identifier -> %IDENTIFIER {% $identifier %}