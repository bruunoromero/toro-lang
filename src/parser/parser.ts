import { LCURLY } from "./../lexer/specials";
import { EQUALS } from "./../lexer/operators";
import { Parser, IToken } from "chevrotain";

import { TOKENS } from "../lexer";
import { IMPORT, DEF } from "../lexer/keywords";
import { IDENTIFIER } from "../lexer/literals";

class ToroParser extends Parser {
  constructor(input: IToken[]) {
    super(input, TOKENS, { outputCst: true });

    this.performSelfAnalysis();
  }

  public importClause = this.RULE("importClause", () => {
    this.CONSUME(IMPORT);
    this.CONSUME(IDENTIFIER);
  });
}

export const parser = new ToroParser([]);

export const BaseVisitor = parser.getBaseCstVisitorConstructor();
