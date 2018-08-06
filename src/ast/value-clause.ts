import { Clause } from "./clause";

export abstract class ValueClause<T> extends Clause {
  constructor(public readonly value: T) {
    super();
  }
}
