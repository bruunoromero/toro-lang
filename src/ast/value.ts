import { Type } from "./type";
import { Clause } from "./clause";

export class Value<E> extends Clause {
  constructor(public readonly type: Type, public readonly value: E) {
    super();
  }
}
