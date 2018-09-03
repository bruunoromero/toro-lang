import { Statement } from "./statement";
import { Location } from "./location";
import { JSNode } from "../generator/js-node";

export class Body extends Statement {
  constructor(loc: Location, public readonly stmts: Statement[]) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
