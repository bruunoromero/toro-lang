import { ValueClause } from "./value-clause";

export class StringClause extends ValueClause<string> {
  static TYPE = "STRING_CLAUSE";

  constructor(public value: string) {
    super(StringClause.TYPE);
  }
}
