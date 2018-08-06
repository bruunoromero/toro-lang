import { Clause } from "./clause";

export abstract class Value<T> extends Clause {
  constructor(public readonly value: T) {
    super();
  }
}
