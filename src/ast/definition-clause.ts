import { Clause } from "./clause";
import { ExpressionClause } from "./expression-clause";

export class DefinitionClause extends Clause {
  constructor(public name: string, public expressions: ExpressionClause[]) {
    super();
  }
}
