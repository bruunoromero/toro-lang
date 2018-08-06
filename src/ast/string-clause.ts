import { ValueClause } from "./value-clause";

export class StringClause extends ValueClause<string> {
  constructor(public value: string) {
    super();
  }
}
