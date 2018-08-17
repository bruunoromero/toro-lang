import { Clause } from "./clause";

export class Expression extends Clause {
  constructor(public readonly ctx: any, public readonly expression: any) {
    super(ctx);
  }
}
