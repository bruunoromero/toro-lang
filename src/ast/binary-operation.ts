import { Clause } from "./clause";
import { Double } from "./double";
import { Integer } from "./integer";
import { ListType } from "./primitives";
import { BooleanLiteral } from "./boolean";

export type AtomicValue = Integer | Double | BooleanLiteral | ListType;

export abstract class BinaryOperation extends Clause {
  constructor(
    public readonly ctx: any,
    public left: AtomicValue | BinaryOperation,
    public right?: AtomicValue | BinaryOperation,
  ) {
    super(ctx);
  }

  squash(): AtomicValue | BinaryOperation {
    if (this.left && !this.right) {
      return this.left;
    }

    if (this.left.is(BinaryOperation)) {
      this.left = (this.left as BinaryOperation).squash();
    }

    if (this.right!.is(BinaryOperation)) {
      this.right = (this.right as BinaryOperation).squash();
    }

    if (!this.left.is(BinaryOperation) && !this.right!.is(BinaryOperation)) {
      return this.evaluate();
    }

    return this;
  }

  abstract evaluate(): AtomicValue | BinaryOperation;
}
