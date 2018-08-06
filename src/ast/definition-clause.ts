import { Clause } from "./clause";
import { ExpressionClause } from "./expression-clause";

export class DefinitionClause extends Clause {
  constructor(
    public readonly name: string,
    public readonly expressions: ExpressionClause[],
  ) {
    super();
  }
}
