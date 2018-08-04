import { Clause } from "./clause";
import { ExpressionClause } from "./expression-clause";

export class DefinitionClause extends Clause {
  static TYPE = "DEFINITION_CLAUSE";

  constructor(
    public name: string,
    public definitions: DefinitionClause[],
    public expressions: ExpressionClause[],
  ) {
    super(DefinitionClause.TYPE);
  }
}
