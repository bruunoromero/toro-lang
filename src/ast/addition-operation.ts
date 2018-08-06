import { DoubleClause } from "./double-clause";
import { StringClause } from "./string-clause";
import { IntegerClause } from "./integer-clause";
import { BinaryOperation, AtomicValue } from "./binary-operation";

export class AdditionOperation extends BinaryOperation {
  evaluate(): AtomicValue {
    if (this.left.is(IntegerClause) && this.right.is(IntegerClause)) {
      const value =
        (this.left as IntegerClause).value +
        (this.right as IntegerClause).value;
      return new IntegerClause(value);
    } else if (this.left.is(DoubleClause) && this.right.is(DoubleClause)) {
      const value =
        (this.left as DoubleClause).value + (this.right as DoubleClause).value;
      return new DoubleClause(value);
    } else if (this.left.is(StringClause) && this.right.is(StringClause)) {
      const value =
        (this.left as StringClause).value + (this.right as StringClause).value;
      return new StringClause(value);
    }

    throw new Error("diferent types");
  }
}
