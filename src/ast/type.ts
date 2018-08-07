import { Clause } from "./clause";

export class Type extends Clause {
  constructor(
    public readonly ctx: any,
    public readonly name: string,
    public readonly isConcrete = true,
  ) {
    super(ctx);
  }
}
