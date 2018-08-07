import { Type } from "./type";
import { Value } from "./value";
import { ArrayType } from "./primitives";

export class ArrayLiteral<E> extends Value<E[]> {
  constructor(public readonly type: Type, public readonly value: E[]) {
    super(new ArrayType(type), value);
  }
}
