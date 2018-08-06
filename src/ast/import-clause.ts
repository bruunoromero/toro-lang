import { Clause } from "./clause";

export class ImportClause extends Clause {
  constructor(public path: string[]) {
    super();
  }
}
