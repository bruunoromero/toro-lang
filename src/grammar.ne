@{%
const lexer = require('./lexer.js');
%}

@builtin "postprocessors.ne"

@lexer lexer

program -> _ delimited[import, %NL] _

import -> _ "import" __ delimited[%IDENTIFIER, %DOT] %WS:?

_ -> (%WS | %NL):*
__ -> %WS:+