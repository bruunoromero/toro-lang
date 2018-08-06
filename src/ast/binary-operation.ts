import { Clause } from "./clause";
import { StringClause } from "./string-clause";
import { DoubleClause } from "./double-clause";
import { IntegerClause } from "./integer-clause";

export type AtomicValue = IntegerClause | DoubleClause | StringClause;

export abstract class BinaryOperation extends Clause {
  constructor(
    public left: AtomicValue | BinaryOperation,
    public right: AtomicValue | BinaryOperation,
  ) {
    super();
  }

  squash(): AtomicValue | BinaryOperation {
    if (this.left.is(BinaryOperation)) {
      this.left = (this.left as BinaryOperation).squash();
    }

    if (this.right.is(BinaryOperation)) {
      this.right = (this.right as BinaryOperation).squash();
    }

    if (!this.left.is(BinaryOperation) && !this.right.is(BinaryOperation)) {
      return this.evaluate();
    }

    return this;
  }

  abstract evaluate(): AtomicValue;
}
