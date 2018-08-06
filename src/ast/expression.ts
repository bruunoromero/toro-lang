import { Clause } from "./clause";
import { AtomicValue, BinaryOperation } from "./binary-operation";

export class Expression extends Clause {
  constructor(public readonly expression: AtomicValue | BinaryOperation) {
    super();
  }
}
