import { Parser, IToken } from "chevrotain";

import { TOKENS } from "../lexer";
import { IMPORT, DEF, FALSE, EXPORT, TRUE } from "../lexer/keywords";
import { CHAR, IDENTIFIER, STRING, INTEGER, DOUBLE } from "../lexer/literals";

import {
  PLUS,
  MINUS,
  EQUALS,
  PERIOD,
  ADDITION_OPERATOR,
  MULTIPLICATION_OPERATOR,
} from "../lexer/operators";

import {
  LT,
  RT,
  RBRACE,
  LBRACE,
  COLON,
  COMMA,
  LCURLY,
  RCURLY,
  LPAREN,
  RPAREN,
  SEMI_COLON,
} from "../lexer/specials";

class ToroParser extends Parser {
  constructor(input: IToken[]) {
    super(input, TOKENS, { outputCst: true });

    this.performSelfAnalysis();
  }

  public program = this.RULE("program", () => {
    this.MANY(() => this.SUBRULE(this.importClause));
    this.MANY1(() => this.SUBRULE(this.exportableDefinitionClause));
  });

  private importClause = this.RULE("importClause", () => {
    this.CONSUME(IMPORT);
    this.SUBRULE(this.reference);
    this.CONSUME1(SEMI_COLON);
  });

  private exportableDefinitionClause = this.RULE(
    "exportableDefinitionClause",
    () => {
      this.OPTION(() => this.CONSUME(EXPORT));
      this.SUBRULE1(this.definitionClause);
    },
  );

  private definitionClause = this.RULE("definitionClause", () => {
    this.CONSUME(DEF);
    this.CONSUME1(IDENTIFIER);
    this.OPTION(() => this.SUBRULE(this.genericsDefinition));
    this.OPTION1(() => {
      this.CONSUME2(LPAREN);
      this.SUBRULE1(this.parameterDefinition);
      this.CONSUME3(RPAREN);
    });
    this.OPTION2(() => {
      this.CONSUME4(COLON);
      this.SUBRULE2(this.type);
    });
    this.CONSUME4(EQUALS);
    this.OR([
      { ALT: () => this.SUBRULE3(this.block) },
      { ALT: () => this.SUBRULE4(this.expression) },
    ]);
  });

  private type = this.RULE("type", () => {
    this.CONSUME(IDENTIFIER);
    this.OPTION(() => this.SUBRULE(this.generics));
  });

  private generics = this.RULE("generics", () => {
    this.CONSUME(LT);
    this.AT_LEAST_ONE_SEP({
      SEP: COMMA,
      DEF: () => this.SUBRULE(this.type),
    });
    this.CONSUME2(RT);
  });

  private genericsDefinition = this.RULE("genericsDefinition", () => {
    this.CONSUME(LT);
    this.AT_LEAST_ONE_SEP({
      SEP: COMMA,
      DEF: () => this.CONSUME(IDENTIFIER),
    });
    this.CONSUME2(RT);
  });

  private parameterDefinition = this.RULE("parameterDefinition", () => {
    this.MANY_SEP({
      SEP: COMMA,
      DEF: () => {
        this.CONSUME(IDENTIFIER, { LABEL: "name" });
        this.CONSUME1(COLON);
        this.SUBRULE(this.type);
      },
    });
  });

  private block = this.RULE("block", () => {
    this.CONSUME(LCURLY);
    this.MANY(() => this.SUBRULE(this.expressionOrDefinition));
    this.CONSUME(RCURLY);
  });

  private expressionOrDefinition = this.RULE("expressionOrDefinition", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.expression) },
      { ALT: () => this.SUBRULE(this.definitionClause) },
    ]);
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
      { ALT: () => this.CONSUME(CHAR) },
      { ALT: () => this.CONSUME1(STRING) },
      { ALT: () => this.CONSUME2(DOUBLE) },
      { ALT: () => this.CONSUME3(INTEGER) },
      { ALT: () => this.CONSUME4(TRUE) },
      { ALT: () => this.CONSUME5(FALSE) },
      { ALT: () => this.SUBRULE(this.list) },
      { ALT: () => this.SUBRULE1(this.functionCall) },
    ]);
  });

  private list = this.RULE("list", () => {
    this.CONSUME(LBRACE);
    this.MANY_SEP({
      SEP: COMMA,
      DEF: () => this.SUBRULE(this.addition),
    });
    this.CONSUME(RBRACE);
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
