@{%
const lexer = require('./lexer.js');
%}

@lexer lexer

program -> %IMPORT __ %INTEGER

reference -> %IDENTIFIER 

_ -> %WS
__ -> %WS