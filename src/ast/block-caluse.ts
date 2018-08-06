import { Clause } from "./clause";
import { ExpressionClause } from "./expression-clause";
import { DefinitionClause } from "./definition-clause";

export class BlockClause extends Clause {
  constructor(
    public readonly definitions: Map<string, DefinitionClause>,
    public readonly expressions: ExpressionClause[],
  ) {
    super();
  }
}
