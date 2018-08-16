import { Type } from "./type";
import { Value } from "./value";
import { ListType } from "./primitives";

export class List<T> extends Value<T[]> {
  constructor(
    public readonly ctx: any,
    public readonly type: Type,
    public readonly value: T[],
  ) {
    super(ctx, new ListType(ctx, type), value);
  }
}
