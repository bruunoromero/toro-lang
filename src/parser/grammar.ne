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
  $defmacro,
  $defsyntax,
  $identifier,
} from './parsers';
%}

@preprocessor typescript

@lexer lexer

program -> clauses:*

clauses
  -> do
  |  fn
  |  if
  |  def
  |  defmacro
  |  defsyntax
  |  primitive

do -> "(" "do" primitive:* ")" {% $do %}

if -> "(" "if" primitive:* ")" {% $if %}

fn -> "(" "fn" vector primitive:* ")" {% $fn %}

def -> "(" "def" identifier primitive:* ")" {% $def %}

defmacro -> "(" "defmacro" identifier vector primitive:* ")" {% $defmacro %}

defsyntax -> "(" "defsyntax" identifier vector primitive:* ")" {% $defsyntax %}

primitive
  -> nil
  |  true
  |  list
  |  false
  |  vector
  |  symbol
  |  number
  |  string
  |  identifier

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