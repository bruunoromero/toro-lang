import { Clause } from "./clause";

export class Identifier extends Clause {
  constructor(public readonly ctx: any, public readonly name: string) {
    super(ctx);
  }
}
