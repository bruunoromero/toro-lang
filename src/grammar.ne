@{%
const lexer = require('./lexer.js');
%}

@builtin "postprocessors.ne"

@lexer lexer

program -> _ delimited[import, %NL]:? _ delimited[exportableDefinition, %NL]:? _

import -> _ "import" __ delimited[%IDENTIFIER, %DOT] %WS:?

exportableDefinition -> (_ "export"):? definition

definition -> _ "def" __ %IDENTIFIER _ "=" block

block -> _ "{" _ delimited[expression, %NL]:? _ "}" %WS:?

expression -> _ definition _

_ -> (%WS | %NL):*
__ -> %WS:+