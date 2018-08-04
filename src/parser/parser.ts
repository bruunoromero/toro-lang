import { Parser, IToken } from "chevrotain";

import {
  COMMA,
  LCURLY,
  RCURLY,
  LPAREN,
  RPAREN,
  SEMI_COLON,
} from "../lexer/specials";

import { TOKENS } from "../lexer";
import { IMPORT, DEF } from "../lexer/keywords";
import { EQUALS, PERIOD, PLUS, TIMES } from "../lexer/operators";
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

  private definitionClause = this.RULE("definitionClause", () => {
    this.CONSUME(DEF);
    this.CONSUME1(IDENTIFIER);
    this.CONSUME2(EQUALS);
    this.OR([
      { ALT: () => this.SUBRULE(this.block) },
      { ALT: () => this.SUBRULE1(this.expression) },
    ]);
  });

  private block = this.RULE("block", () => {
    this.CONSUME(LCURLY);
    this.AT_LEAST_ONE(() => this.SUBRULE(this.expression));
    this.CONSUME(RCURLY);
  });

  private expression = this.RULE("expression", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.arithmetic) },
      { ALT: () => this.SUBRULE(this.definitionClause) },
    ]);
    this.CONSUME(SEMI_COLON);
  });

  private arithmetic = this.RULE("arithmetic", () => {
    this.SUBRULE(this.addition);
  });

  private addition = this.RULE("addition", () => {
    this.SUBRULE(this.multiplication, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(PLUS);
      this.SUBRULE2(this.multiplication, { LABEL: "rhs" });
    });
  });

  private multiplication = this.RULE("multiplication", () => {
    this.SUBRULE(this.atomic, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(TIMES);
      this.SUBRULE2(this.atomic, { LABEL: "rhs" });
    });
  });

  private atomic = this.RULE("atomic", () =>
    this.OR([
      { ALT: () => this.SUBRULE(this.parenthesis) },
      { ALT: () => this.SUBRULE(this.value) },
    ]),
  );

  private parenthesis = this.RULE("parenthesis", () => {
    this.CONSUME(LPAREN);
    this.SUBRULE(this.arithmetic);
    this.CONSUME(RPAREN);
  });

  private value = this.RULE("value", () => {
    this.OR([
      { ALT: () => this.CONSUME(STRING) },
      { ALT: () => this.CONSUME1(DOUBLE) },
      { ALT: () => this.CONSUME2(INTEGER) },
      { ALT: () => this.SUBRULE(this.functionCall) },
    ]);
  });

  private functionCall = this.RULE("functionCall", () => {
    this.SUBRULE(this.reference);
    this.OPTION(() => {
      this.CONSUME1(LPAREN);
      this.MANY_SEP({
        SEP: COMMA,
        DEF: () => this.SUBRULE(this.expression),
      });
      this.CONSUME(RPAREN);
    });
  });

  private reference = this.RULE("reference", () => {
    this.AT_LEAST_ONE_SEP({
      SEP: PERIOD,
      DEF: () => this.CONSUME1(IDENTIFIER),
    });
  });
}

export const parser = new ToroParser([]);

export const BaseVisitor = parser.getBaseCstVisitorConstructor();
