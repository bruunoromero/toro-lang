import { COLON } from "../lexer/specials";
import { PLUS, MINUS } from "../lexer/operators";
import { EXPORT } from "../lexer/keywords";
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
import {
  EQUALS,
  PERIOD,
  ADDITION_OPERATOR,
  MULTIPLICATION_OPERATOR,
} from "../lexer/operators";
import { IDENTIFIER, STRING, INTEGER, DOUBLE } from "../lexer/literals";

class ToroParser extends Parser {
  constructor(input: IToken[]) {
    super(input, TOKENS, { outputCst: true });

    this.performSelfAnalysis();
  }

  public program = this.RULE("program", () => {
    this.MANY(() => this.SUBRULE(this.importClause));
    this.MANY1(() => {
      this.OPTION(() => this.CONSUME(EXPORT));
      this.SUBRULE1(this.definitionClause);
    });
  });

  private importClause = this.RULE("importClause", () => {
    this.CONSUME(IMPORT);
    this.SUBRULE(this.reference);
    this.CONSUME1(SEMI_COLON);
  });

  private definitionClause = this.RULE("definitionClause", () => {
    this.CONSUME(DEF);
    this.CONSUME1(IDENTIFIER);
    this.OPTION(() => {
      this.CONSUME(LPAREN);
      this.SUBRULE(this.parameterDefinition);
      this.CONSUME(RPAREN);
    });
    this.CONSUME2(EQUALS);
    this.OR([
      { ALT: () => this.SUBRULE1(this.block) },
      { ALT: () => this.SUBRULE2(this.expression) },
    ]);
  });

  private parameterDefinition = this.RULE("parameterDefinition", () => {
    this.MANY_SEP({
      SEP: COMMA,
      DEF: () => {
        this.CONSUME(IDENTIFIER, { LABEL: "name" });
        this.CONSUME1(COLON);
        this.CONSUME2(IDENTIFIER, { LABEL: "type" });
      },
    });
  });

  private block = this.RULE("block", () => {
    this.CONSUME(LCURLY);
    this.AT_LEAST_ONE(() =>
      this.OR([
        { ALT: () => this.SUBRULE(this.expression) },
        { ALT: () => this.SUBRULE(this.definitionClause) },
      ]),
    );
    this.CONSUME(RCURLY);
  });

  private expression = this.RULE("expression", () => {
    this.SUBRULE(this.addition);
    this.CONSUME(SEMI_COLON);
  });

  private addition = this.RULE("addition", () => {
    this.SUBRULE(this.multiplication, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(ADDITION_OPERATOR);
      this.SUBRULE2(this.multiplication, { LABEL: "rhs" });
    });
  });

  private multiplication = this.RULE("multiplication", () => {
    this.SUBRULE(this.atomic, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(MULTIPLICATION_OPERATOR);
      this.SUBRULE2(this.atomic, { LABEL: "rhs" });
    });
  });

  private atomic = this.RULE("atomic", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.parenthesis) },
      { ALT: () => this.SUBRULE(this.value) },
    ]);
  });

  private parenthesis = this.RULE("parenthesis", () => {
    this.CONSUME(LPAREN);
    this.SUBRULE(this.addition);
    this.CONSUME(RPAREN);
  });

  private value = this.RULE("value", () => {
    this.OPTION(() => {
      this.OR([
        { ALT: () => this.CONSUME(PLUS) },
        { ALT: () => this.CONSUME1(MINUS) },
      ]);
    });
    this.OR1([
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
        DEF: () => this.SUBRULE(this.addition),
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

export const PARSER = new ToroParser([]);

export const BaseVisitor = PARSER.getBaseCstVisitorConstructor();
