import { BinaryOperation, AtomicValue } from "./binary-operation";
import { Integer } from "./integer";
import { Double } from "./double";
export class SubtractionOperation extends BinaryOperation {
  evaluate(): AtomicValue | BinaryOperation {
    if (this.left.is(Integer) && this.right!.is(Integer)) {
      const value =
        (this.left as Integer).value - (this.right as Integer).value;
      return new Integer(value);
    } else if (this.left.is(Double) && this.right!.is(Double)) {
      const value = (this.left as Double).value - (this.right! as Double).value;
      return new Double(value);
    }

    return this;
  }
}
