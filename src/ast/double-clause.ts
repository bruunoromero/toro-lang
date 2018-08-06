import { ValueClause } from "./value-clause";

export class DoubleClause extends ValueClause<number> {
  static TYPE = "DOUBLE_CLAUSE";

  constructor(public value: number) {
    super(DoubleClause.TYPE);
  }
}
