import { Clause } from "./clause";
import { Identifier } from "./identifier";

export class Type extends Clause {
  constructor(
    public readonly identifier: Identifier,
    public readonly isConcrete = true,
  ) {
    super(identifier.ctx);
  }
}
