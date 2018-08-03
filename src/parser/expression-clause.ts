import { Clause } from "./clause";

export class ExpressionClause extends Clause {
  static TYPE = "EXPRESSION_CLAUSE";

  constructor() {
    super(ExpressionClause.TYPE);
  }
}
