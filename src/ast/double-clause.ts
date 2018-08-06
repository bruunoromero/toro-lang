import { ValueClause } from "./value-clause";

export class DoubleClause extends ValueClause<number> {
  constructor(public value: number) {
    super();
  }
}
