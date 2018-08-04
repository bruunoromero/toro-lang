import { Parser, IToken } from "chevrotain";

import {
  COMMA,
  LCURLY,
  RCURLY,
  LPAREN,
  RPAREN,
  SEMI_COLON,
} from "./../lexer/specials";

import { TOKENS } from "../lexer";
import { IMPORT, DEF } from "../lexer/keywords";
import { EQUALS, PERIOD } from "./../lexer/operators";
import { IDENTIFIER, STRING, INTEGER, DOUBLE } from "../lexer/literals";

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
    this.SUBRULE(this.reference);
    this.CONSUME1(SEMI_COLON);
  });

  private reference = this.RULE("reference", () => {
    this.MANY_SEP({
      SEP: PERIOD,
      DEF: () => this.CONSUME1(IDENTIFIER),
    });
  });

  private definitionClause = this.RULE("definitionClause", () => {
    this.CONSUME(DEF);
    this.CONSUME1(IDENTIFIER);
    this.CONSUME2(EQUALS);
    this.OR([
      { ALT: () => this.SUBRULE1(this.block) },
      {
        ALT: () => {
          this.SUBRULE2(this.expression);
          this.CONSUME3(SEMI_COLON);
        },
      },
    ]);
  });

  private expression = this.RULE("expression", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.term) },
      {
        ALT: () => this.SUBRULE(this.functionCall),
      },
    ]);
  });

  private term = this.RULE("term", () => {
    this.OR([
      { ALT: () => this.CONSUME(STRING) },
      { ALT: () => this.CONSUME(DOUBLE) },
      { ALT: () => this.CONSUME(INTEGER) },
    ]);
  });

  private functionCall = this.RULE("functionCall", () => {
    this.SUBRULE(this.reference);

    this.OPTION(() => {
      this.CONSUME(RPAREN);
      this.MANY_SEP({
        SEP: COMMA,
        DEF: () => this.SUBRULE(this.expression),
      });
      this.CONSUME1(LPAREN);
    });

    this.CONSUME2(SEMI_COLON);
  });

  private block = this.RULE("block", () => {
    this.CONSUME(LCURLY);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.expression) },
        { ALT: () => this.SUBRULE(this.definitionClause) },
      ]);
    });
    this.CONSUME1(RCURLY);
  });
}

export const parser = new ToroParser([]);

export const BaseVisitor = parser.getBaseCstVisitorConstructor();
