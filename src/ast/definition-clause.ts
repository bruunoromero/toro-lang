import { Clause } from "./clause";
import { FunctionClause } from "./function-clause";

export class DefinitionClause extends Clause {
  constructor(
    public readonly name: string,
    public readonly value: FunctionClause,
  ) {
    super();
  }
}
