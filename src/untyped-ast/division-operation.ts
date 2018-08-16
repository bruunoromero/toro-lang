import { Double } from "./double";
import { Integer } from "./integer";
import { BinaryOperation, AtomicValue } from "./binary-operation";

export class DivisionOperation extends BinaryOperation {
  evaluate(): AtomicValue | BinaryOperation {
    if (this.left.is(Integer) && this.right!.is(Integer)) {
      const value =
        (this.left as Integer).value / (this.right as Integer).value;
      return new Integer(this.ctx, value);
    } else if (this.left.is(Double) && this.right!.is(Double)) {
      const value = (this.left as Double).value / (this.right as Double).value;
      return new Double(this.ctx, value);
    }

    return this;
  }
}
