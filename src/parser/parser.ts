import { Parser, IToken } from "chevrotain";

import { TOKENS } from "../lexer";
import { IMPORT, DEF, FALSE, EXPORT, TRUE } from "../lexer/keywords";
import { CHAR, IDENTIFIER, STRING, INTEGER, DOUBLE } from "../lexer/literals";

import {
  DOT,
  PLUS,
  MINUS,
  EQUALS,
  PRECEDENCE1,
  PRECEDENCE2,
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

const enum ExpressionType {
  Char,
  String,
  Double,
  Numeric,
  Integer,
  Boolean,
}

class ToroParser extends Parser {
  canSetExpressionType = true;
  expressionType?: ExpressionType;
  constructor(input: IToken[]) {
    super(input, TOKENS, { outputCst: true });

    this.performSelfAnalysis();
  }

  private expressionTypeIs(expType: ExpressionType[]) {
    if (this.expressionType === undefined) return true;

    return expType.some(t => this.expressionType === this.expressionType);
  }

  private setExpressionType(expType: ExpressionType) {
    if (this.canSetExpressionType) {
      this.expressionType = expType;
      this.canSetExpressionType = false;
    }
  }

  private resetExpressionType() {
    this.expressionType = undefined;
    this.canSetExpressionType = true;
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
    this.SUBRULE(this.precendence1);
    this.CONSUME(SEMI_COLON);

    this.resetExpressionType();
  });

  private precendence1 = this.RULE("precendence1", () => {
    this.OPTION(() => this.SUBRULE(this.unaryOparation));
    this.SUBRULE(this.precendence2, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(PRECEDENCE1);
      this.SUBRULE2(this.precendence2, { LABEL: "rhs" });
    });
  });

  private precendence2 = this.RULE("precendence2", () => {
    this.SUBRULE(this.arithmeticExpression, { LABEL: "lhs" });
    this.MANY(() => {
      this.CONSUME(PRECEDENCE2);
      this.SUBRULE1(this.arithmeticExpression, { LABEL: "rhs" });
    });
  });

  private unaryOparation = this.RULE("unaryOparation", () => {
    this.OR([
      {
        ALT: () => {
          this.CONSUME(PLUS);
          this.setExpressionType(ExpressionType.Numeric);
        },
      },
      {
        ALT: () => {
          this.CONSUME(MINUS);
          this.setExpressionType(ExpressionType.Numeric);
        },
      },
    ]);
  });

  private arithmeticExpression = this.RULE("arithmeticExpression", () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.parenthesis) },
      { ALT: () => this.SUBRULE(this.atomicValues) },
    ]);
  });

  private parenthesis = this.RULE("parenthesis", () => {
    this.CONSUME(LPAREN);
    this.SUBRULE(this.precendence1);
    this.CONSUME(RPAREN);
  });

  private atomicValues = this.RULE("atomicValues", () => {
    this.OR([
      {
        GATE: () =>
          this.expressionTypeIs([
            ExpressionType.Numeric,
            ExpressionType.Double,
          ]),
        ALT: () => {
          this.CONSUME2(DOUBLE);
          this.setExpressionType(ExpressionType.Double);
        },
      },
      {
        GATE: () =>
          this.expressionTypeIs([
            ExpressionType.Numeric,
            ExpressionType.Integer,
          ]),
        ALT: () => {
          this.CONSUME3(INTEGER);
          this.setExpressionType(ExpressionType.Integer);
        },
      },
      {
        GATE: () => this.expressionTypeIs([ExpressionType.Boolean]),
        ALT: () => {
          this.OR2([
            {
              ALT: () => {
                this.CONSUME(TRUE);
                this.setExpressionType(ExpressionType.Boolean);
              },
            },
            {
              ALT: () => {
                this.CONSUME1(FALSE);
                this.setExpressionType(ExpressionType.Boolean);
              },
            },
          ]);
        },
      },
      {
        GATE: () => this.expressionTypeIs([ExpressionType.Char]),
        ALT: () => {
          this.CONSUME(CHAR);
          this.setExpressionType(ExpressionType.Char);
        },
      },
      {
        GATE: () => this.expressionTypeIs([ExpressionType.String]),
        ALT: () => {
          this.CONSUME1(STRING);
          this.setExpressionType(ExpressionType.String);
        },
      },
      { ALT: () => this.SUBRULE(this.functionCall) },
    ]);
  });

  private list = this.RULE("list", () => {
    this.CONSUME(LBRACE);
    this.MANY_SEP({
      SEP: COMMA,
      DEF: () => this.SUBRULE(this.precendence1),
    });
    this.CONSUME(RBRACE);
  });

  private functionCall = this.RULE("functionCall", () => {
    this.SUBRULE(this.reference);
    this.OPTION(() => {
      this.CONSUME1(LPAREN);
      this.MANY_SEP({
        SEP: COMMA,
        DEF: () => this.SUBRULE(this.precendence1),
      });
      this.CONSUME(RPAREN);
    });
  });

  private reference = this.RULE("reference", () => {
    this.AT_LEAST_ONE_SEP({
      SEP: DOT,
      DEF: () => this.CONSUME1(IDENTIFIER),
    });
  });
}

export const PARSER = new ToroParser([]);

export const BaseVisitor = PARSER.getBaseCstVisitorConstructor();
