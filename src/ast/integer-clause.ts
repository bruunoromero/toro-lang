import { ValueClause } from "./value-clause";

export class IntegerClause extends ValueClause<number> {
  static TYPE = "INTEGER_CLAUSE";

  constructor(public value: number) {
    super(IntegerClause.TYPE);
  }
}
