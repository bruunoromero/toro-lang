import { ValueClause } from "./value-clause";

export class IntegerClause extends ValueClause<number> {
  constructor(public value: number) {
    super();
  }
}
