import { Type } from "./type";
import { Clause } from "./clause";

export class Value<T> extends Clause {
  constructor(public readonly type: Type, public readonly value: T) {
    super();
  }
}
