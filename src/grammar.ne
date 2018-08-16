@{%
import { lexer } from './lexer'
%}

@preprocessor typescript

@builtin "postprocessors.ne"

@lexer lexer

### --- Macros --- ###

# Optional White space follwed by an optional Element and an optional White Space
optional[el]-> _ ($el _):?

# Optional White space follwed by an optional Element and a mandatory White Space
optionalWithSpace[el] -> _ ($el __):?

# Optional White space follwed by 2 sequences of an optional Element and an optional White Space
optional2[el1, el2]-> _ ($el1 _):? ($el2 _):?

# Optional White space follwed by sequences of an optional Elements separated by 
# an Optional White space, Comma and Optional White space
parameters[el] -> optional[delimited[$el,  _ %COMMA _]]

# Optional White space followed by an Element and an Optional White space,
# then an Optional sequences of Elements with an Separator
atLeastOne[el, sep] -> _ $el _ ($sep _ delimited[$el, _ $sep _]):?


### --- Main --- ###

# A program is a seqauences of imports separated by Lines,
# followed by exportable definitions separated by Lines
program -> delimited[import, %NL]:? delimited[exportableDefinition, %NL]:?

import -> _ "import" __ reference _

exportableDefinition -> optionalWithSpace["export"] definition _


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

recordValue -> %IDENTIFIER __ "=" __ expression

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

matchExpression -> "match" _ "(" _ expression _ ")" _ "{" delimited[matchClause, %NL] "}"

matchClause -> _ expression __ "->" __ body _


### -- Definitions  -- ###

unionName -> %IDENTIFIER optional[genericParameter]

unionDefinition -> "type" __ unionName "=" atLeastOne[unionType, "|"]

unionType -> %IDENTIFIER ("(" atLeastOne[typeDefinition, %COMMA] ")"):?

constantDefinition -> "let" __ %IDENTIFIER _ returnType:? "=" _ body

functionDefinition -> "def" __ %IDENTIFIER optional[(parameterList | genericParameter _ parameterList)] (_ returnType):? "=" _ body

definition 
  -> constantDefinition
  |  functionDefinition
  |  unionDefinition


### --- Type Definition --- ###

typeDefinition -> typeName | arrowFunctionType

arrowFunctionType -> "(" parameters[typeName] ")" _ "=>" _ typeName

typeName -> %IDENTIFIER optional["<" atLeastOne[typeDefinition, %COMMA] ">"]


### --- UTILS --- ###

body -> block | expression

block -> "{" optional[delimited[(expression | definition), %NL]] "}"

genericParameter -> "<" atLeastOne[%IDENTIFIER, %COMMA] ">"

argumentList -> "(" parameters[arithmeticExpression] ")"

parameterList -> "(" parameters[parameter]  ")"

returnType -> ":" _ typeDefinition

parameter -> %IDENTIFIER _ returnType

optionalTypedParameter -> %IDENTIFIER _ (returnType):?

reference -> delimited[%IDENTIFIER,  _ %DOT _]

_ -> (%WS | %NL):*
__ -> %WS:+