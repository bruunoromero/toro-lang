import { Parser, IToken } from "chevrotain";

import {
  LCURLY,
  RCURLY,
  LPAREN,
  RPAREN,
  SEMI_COLON,
} from "./../lexer/specials";

import { EQUALS, PERIOD } from "./../lexer/operators";
import { TOKENS } from "../lexer";
import { IMPORT, DEF } from "../lexer/keywords";
import { IDENTIFIER, STRING, INTEGER } from "../lexer/literals";

class ToroParser extends Parser {
  constructor(input: IToken[]) {
    super(input, TOKENS, { outputCst: true });

    this.performSelfAnalysis();
  }

  public program = this.RULE("program", () => {
    this.MANY(() => this.SUBRULE(this.importClause));
    this.MANY1(() => this.SUBRULE1(this.definitionClause));
  });

  private importClause = this.RULE("importClause", () => {
    this.CONSUME(IMPORT);
    this.CONSUME1(IDENTIFIER);
    this.MANY(() => {
      this.CONSUME2(PERIOD);
      this.CONSUME3(IDENTIFIER);
    });
    this.CONSUME4(SEMI_COLON);
  });

  private definitionClause = this.RULE("definitionClause", () => {
    this.CONSUME(DEF);
    this.CONSUME1(IDENTIFIER);
    this.CONSUME2(EQUALS);
    this.OR([
      { ALT: () => this.SUBRULE(this.block) },
      { ALT: () => this.SUBRULE1(this.expression) },
    ]);
  });

  private expression = this.RULE("expression", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.definitionClause) },
      {
        ALT: () => {
          this.CONSUME(INTEGER);
          this.CONSUME1(SEMI_COLON);
        },
      },
      {
        ALT: () => {
          this.CONSUME2(IDENTIFIER);
          this.CONSUME3(PERIOD);
          this.CONSUME4(IDENTIFIER);
          this.CONSUME5(LPAREN);
          this.CONSUME6(STRING);
          this.CONSUME7(RPAREN);
          this.CONSUME8(SEMI_COLON);
        },
      },
    ]);
  });

  private block = this.RULE("block", () => {
    this.CONSUME(LCURLY);
    this.MANY(() => {
      this.SUBRULE(this.expression);
    });
    this.CONSUME1(RCURLY);
  });
}

export const parser = new ToroParser([]);

export const BaseVisitor = parser.getBaseCstVisitorConstructor();
