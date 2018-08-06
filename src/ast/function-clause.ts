import { BlockClause } from "./block-caluse";
import { ValueClause } from "./value-clause";
import { ExpressionClause } from "./expression-clause";

export class FunctionClause extends ValueClause<
  ExpressionClause | BlockClause
> {
  constructor(
    public readonly parameters: Map<string, string>,
    public readonly value: ExpressionClause | BlockClause,
  ) {
    super(value);
  }
}
