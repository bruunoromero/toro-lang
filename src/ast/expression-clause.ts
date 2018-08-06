import { Clause } from "./clause";
import { AtomicValue, BinaryOperation } from "./binary-operation";

export class ExpressionClause extends Clause {
  constructor(public readonly expression: AtomicValue | BinaryOperation) {
    super();
  }
}
