@{%
import {
  $module,
} from './header'
%}

@lexer lexer

header -> module

module -> "module" _ identifier (_ exposing):? {% $module %}

import -> "import" _ identifier (_ importOpts):?

importOpts -> importAs (_ exposing):?

importAs -> "as" _ identifier

exposing -> "exposing" _ "(" ")"