import { Clause } from "./clause";

export class ImportClause extends Clause {
  static TYPE = "IMPORT_CLAUSE";

  constructor(public path: string[]) {
    super(ImportClause.TYPE);
  }
}
