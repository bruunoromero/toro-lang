@{%
import {
  $char,
  $string,
  $double,
  $integer,
  $identifier,
} from './core';
%}

@lexer lexer

atomicValue
  -> ( char
     | double
     | string
     | integer
     ) {% id %}

char -> %INTEGER {% $char %}

string -> %STRING {% $string %}

double -> %DOUBLE {% $double %}

integer -> %INTEGER {% $integer %}


identifier -> %IDENTIFIER {% $identifier %}

_ -> %NL:*
__ -> %NL:+