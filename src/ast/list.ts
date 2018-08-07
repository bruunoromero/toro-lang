import { Type } from "./type";
import { Value } from "./value";
import { ListType } from "./primitives";

export class List<T> extends Value<T[]> {
  constructor(public readonly type: Type, public readonly value: T[]) {
    super(new ListType(type), value);
  }
}
