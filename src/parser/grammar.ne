@{%
import { lexer } from './lexer';
import {
  $nil,
  $string,
  $number,
  $symbol,
  $boolean,
  $identifier,
} from './parsers';
%}

@preprocessor typescript

@lexer lexer

program -> _ (list _):*

primitive
  -> map
  |  nil
  |  list
  |  vector
  |  symbol
  |  number
  |  string
  |  boolean
  |  identifier

list -> "(" _ (primitive _):* ")"

nil -> %NIL {% $nil %}

true -> %TRUE {% d => d[0] %}

false -> %FALSE {% d => d[0] %}

boolean -> (true | false) {% d => d[0] %}

map -> "{" _ (primitive _ primitive _):* "}"

vector -> "[" _ (primitive _ primitive _):* "]"

identifier -> %IDENTIFIER {% $identifier %}

string -> %STRING {% $string %}

number -> %NUMBER {% $number %}

symbol -> %SYMBOL {% $symbol %}

_ -> %WS:*