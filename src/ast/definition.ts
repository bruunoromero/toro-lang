import { Clause } from "./clause";
import { FunctionLiteral } from "./function-literal";

export class Definition extends Clause {
  constructor(
    public readonly name: string,
    public readonly value: FunctionLiteral,
    public exports: boolean = false,
  ) {
    super();
  }
}
