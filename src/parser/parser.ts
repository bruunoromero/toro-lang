import { Parser, IToken, IRuleConfig, Lexer } from "chevrotain";
import { EQUALS } from "./../lexer/operators";
import { LCURLY, SEMI_COLON } from "./../lexer/specials";

import { TOKENS } from "../lexer";
import { IMPORT, DEF } from "../lexer/keywords";
import { IDENTIFIER } from "../lexer/literals";

class ToroParser extends Parser {
  constructor(input: IToken[]) {
    super(input, TOKENS, { outputCst: true });

    this.performSelfAnalysis();
  }

  public program = this.RULE("program", () => {
    this.MANY(() => {
      this.OR([{ ALT: () => this.SUBRULE(this.importClause) }]);
    });
  });

  private importClause = this.RULE("importClause", () => {
    this.CONSUME(IMPORT);
    this.CONSUME(IDENTIFIER);
    this.CONSUME(SEMI_COLON);
  });
}

export const parser = new ToroParser([]);

export const BaseVisitor = parser.getBaseCstVisitorConstructor();
