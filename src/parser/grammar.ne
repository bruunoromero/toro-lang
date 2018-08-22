@{%
import { lexer } from './lexer';

import {
  $program,
} from './parsers';
%}

@lexer lexer

@preprocessor typescript
@builtin "postprocessors.ne"

@include "core/core.ne"
@include "header/header.ne"

program -> header {% $program %}