import { Type } from "./type";
import { Clause } from "./clause";
import { Identifier } from "./identifier";

export class Parameter extends Clause {
  constructor(
    public readonly identifier: Identifier,
    public readonly type: Type,
  ) {
    super(null);
  }
}
