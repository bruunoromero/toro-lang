import { Clause } from "./clause";
import { IToken } from "../../node_modules/chevrotain";

export class ImportClause extends Clause {
  static TYPE = "IMPORT_CLAUSE";

  constructor(public module: IToken) {
    super(ImportClause.TYPE);
  }
}
