import { Block } from "./block";
import { Value } from "./value";
import { Expression } from "./expression";

export class FunctionClause extends Value<Expression | Block> {
  constructor(
    public readonly parameters: Map<string, string>,
    public readonly value: Expression | Block,
  ) {
    super(value);
  }
}
