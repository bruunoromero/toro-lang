import { Clause } from "./clause";

export class ExpressionClause extends Clause {
  static TYPE = "EXPRESSION_CLAUSE";

  constructor(public expressions: ExpressionClause[]) {
    super(ExpressionClause.TYPE);
  }
}
