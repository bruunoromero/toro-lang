import { Clause } from "./clause";
import { IToken } from "../../node_modules/chevrotain";

export const IMPORT_CLAUSE_TYPE = "IMPORT_CLAUSE";

export class ImportClause extends Clause {
  constructor(public module: IToken) {
    super(IMPORT_CLAUSE_TYPE);
  }
}
