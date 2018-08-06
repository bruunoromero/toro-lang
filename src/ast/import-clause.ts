import { Clause } from "./clause";

export class ImportClause extends Clause {
  constructor(public readonly path: string[]) {
    super();
  }
}
