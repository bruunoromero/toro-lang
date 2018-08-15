@{%
import { lexer } from './lexer'
%}

@preprocessor typescript

@builtin "postprocessors.ne"

@lexer lexer

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

# A program is a seqauences of imports separated by Lines,
# followed by exportable definitions separated by Lines
program -> delimited[import, %NL]:? delimited[exportableDefinition, %NL]:?

import -> _ "import" __ reference _

exportableDefinition -> optionalWithSpace["export"]  definition _

unionName -> %IDENTIFIER optional[typeParameter]

unionDefinition -> "type" __ unionName "=" atLeastOne[unionType, "|"]

unionType -> %IDENTIFIER ("(" atLeastOne[typeName, %COMMA] ")"):?

definition 
  -> functionDefinition
  |  unionDefinition

functionDefinition -> "def" __ %IDENTIFIER optional[(parameterList | typeParameter _ parameterList)]  "=" _ (block | expression)

ifExpression -> "if" _ "(" optional[expression] ")" _ block _ "else" _ block

block -> "{" optional[delimited[(expression | functionDefinition), %NL]] "}"

expression 
  -> ifExpression
  |  arithmeticExpression

### -- Metematical Operations -- ###

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

callExpression -> reference optional["(" parameters[expression] ")"]

stringLiteral -> %STRING

charLiteral -> %CHAR

recordValue -> %IDENTIFIER __ "=" __ expression

recordLiteral -> "{" atLeastOne[recordValue, %COMMA] "}"

listLiteral -> "[" parameters[expression] "]"

unaryExpression -> ("+" | "-" | "!"):? (arithmeticValues | callExpression)


atomicValues 
  -> unaryExpression
  |  stringLiteral
  |  charLiteral
  |  listLiteral
  |  recordLiteral


typeParameter -> "<" atLeastOne[%IDENTIFIER, %COMMA] ">"

parameterList -> "(" parameters[parameter]  ")"

parameter -> %IDENTIFIER _ ":" _ typeName

typeName -> %IDENTIFIER optional["<" atLeastOne[typeName, %COMMA] ">"]

reference -> delimited[%IDENTIFIER,  _ %DOT _]

_ -> (%WS | %NL):*
__ -> %WS:+