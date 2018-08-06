import { DoubleClause } from "./double-clause";
import { IntegerClause } from "./integer-clause";
import { BinaryOperation, AtomicValue } from "./binary-operation";

export class MultiplicationOperation extends BinaryOperation {
  evaluate(): AtomicValue {
    if (this.left.is(IntegerClause) && this.right!.is(IntegerClause)) {
      const value =
        (this.left as IntegerClause).value *
        (this.right as IntegerClause).value;
      return new IntegerClause(value);
    } else if (this.left.is(DoubleClause) && this.right!.is(DoubleClause)) {
      const value =
        (this.left as DoubleClause).value * (this.right! as DoubleClause).value;
      return new DoubleClause(value);
    }

    throw new Error("diferent types");
  }
}
