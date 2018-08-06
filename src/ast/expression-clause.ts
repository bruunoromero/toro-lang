import { Clause } from "./clause";

export class ExpressionClause extends Clause {
  constructor(public readonly expressions: ExpressionClause[]) {
    super();
  }
}
