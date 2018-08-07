import { Type } from "./type";
import { Block } from "./block";
import { Value } from "./value";
import { Expression } from "./expression";

export class FunctionLiteral extends Value<Expression | Block> {
  constructor(
    public readonly parameters: Map<string, string>,
    public readonly value: Expression | Block,
    public readonly type: Type,
  ) {
    super(type, value);
  }
}
