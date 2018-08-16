import { Clause } from "./clause";
import { Identifier } from "./identifier";

export class Reference extends Clause {
  constructor(
    public readonly ctx: any,
    public readonly identifiers: Identifier[],
  ) {
    super(ctx);
  }
}
