import { Expression } from "./expression";
import { Type } from "./type";
import { FunctionParameters } from "./function-parameters";
import { Clause } from "./clause";
import { Identifier } from "./identifier";

export class FunctionDefinition extends Clause {
  constructor(
    public readonly identifier: Identifier,
    public readonly parameters: FunctionParameters,
    public readonly body: Expression[],
    public readonly type?: Type,
  ) {
    super(null);
  }
}
