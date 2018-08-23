@{%
import { lexer } from './lexer';

import {
  $program,
} from './parsers';

import {
  $char,
  $string,
  $double,
  $integer,
  $identifier,
} from './core';

import {
  $header,
  $module,
  $import,
  $exposed,
  $exposing,
  $importAs,
  $importOpts,
  $moduleName,
} from './header';

import {
  $generic,
  $concreteType,
  $typeParameter
} from './types';
%}

@lexer lexer

@preprocessor typescript

@builtin "postprocessors.ne"

program -> _ header (_ functionDefinition):? _{% $program %}


### --- HEADER --- ###

header -> module (__ delimited[import, __]):? {% $header %}


exposing -> "exposing" _ "(" exposed ")" {% $exposing %}

exposed -> _ delimited[identifier, _ "," _] _ {% $exposed %}


### --- MODULE --- ###

module -> "module" _ moduleName (_ exposing):? {% $module %}


moduleName -> delimited[identifier, _ "." _] {% $moduleName %}


### --- IMPORT --- ###

import -> "import" _ moduleName (_ importOpts):? {% $import %}


importOpts -> importAs (_ exposing):? {% $importOpts %}

importAs -> "as" _ identifier {% $importAs %}


### --- FUNCTIONS --- ###

functionDefinition -> "def" identifier functionParameterList functionType:? _ block


functionParameterList -> "(" _ (delimited[functionParameter, _ "," _] _):? ")"

functionType -> ":" _ concreteType

functionParameter -> identifier _ functionType


### --- TYPES --- ###

concreteType -> delimited[identifier, _ "." _] typeParameter:? {% $concreteType %}

typeParameter -> "(" _ (delimited[genericType, %COMMA]) ")" {% $typeParameter %}

genericType -> %GENERIC {% $generic %}


### --- CORE --- ### 

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

block -> "{" "}"

_ -> %NL:*
__ -> %NL:+