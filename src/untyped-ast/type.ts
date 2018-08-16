import { Clause } from "./clause";
import { Identifier } from "./identifier";

export class Type extends Clause {
  constructor(
    public readonly ctx: any,
    public readonly name: Identifier,
    public readonly isConcrete = true,
  ) {
    super(ctx);
  }
}
