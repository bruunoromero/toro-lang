import { Clause } from "./clause";

export class ImportClause extends Clause {
  constructor(public readonly ctx: any, public readonly path: string[]) {
    super(ctx);
  }
}
