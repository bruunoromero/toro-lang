import { Type } from "./type";
import { Clause } from "./clause";
import { Parameter } from "./parameter";

export class FunctionParameters extends Clause {
  constructor(
    public readonly parameters: Parameter[],
    public readonly generics: Type[] = [],
  ) {
    super(null);
  }
}
