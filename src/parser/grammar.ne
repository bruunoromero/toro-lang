@{%
import { lexer } from './lexer';

import {
  $do,
  $fn,
  $if,
  $def,
  $nil,
  $list,
  $true,
  $false,
  $vector,
  $string,
  $number,
  $symbol,
  $clause,
  $program,
  $defmacro,
  $defsyntax,
  $primitive,
  $identifier,
} from './parsers';
%}

@preprocessor typescript

@lexer lexer

program -> clause:* {% $program %}

clause
  -> ( do
     | fn
     | if
     | def
     | defmacro
     | defsyntax
     | primitive
     ) {% $clause %}

do -> "(" "do" primitive:* ")" {% $do %}

if -> "(" "if" primitive:* ")" {% $if %}

fn -> "(" "fn" vector primitive:* ")" {% $fn %}

def -> "(" "def" identifier primitive:* ")" {% $def %}

defmacro -> "(" "defmacro" identifier vector primitive:* ")" {% $defmacro %}

defsyntax -> "(" "defsyntax" identifier vector primitive:* ")" {% $defsyntax %}

primitive
  -> ( nil
     | true
     | list
     | false
     | vector
     | symbol
     | number
     | string
     | identifier
     ) {% $primitive %}

list -> "(" primitive:* ")" {% $list %}

vector -> "[" primitive:* "]" {% $vector %}

nil -> %NIL {% $nil %}

true -> %TRUE {% $true %}

false -> %FALSE {% $false %}

string -> %STRING {% $string %}

number -> %NUMBER {% $number %}

symbol -> %SYMBOL {% $symbol %}

identifier -> %IDENTIFIER {% $identifier %}

_ -> %WS:*