import { Type } from "./type";
import { Clause } from "./clause";
import { FunctionLiteral } from "./function-literal";

export class Definition extends Clause {
  constructor(
    public readonly name: string,
    public readonly value: FunctionLiteral,
    public readonly type: Type,
    public readonly generics: Type[],
    public exports: boolean = false,
  ) {
    super();
  }
}
