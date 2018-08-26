import { Map } from "immutable";

import { Body } from "./body";
import { Type } from "./type";
import { Definition } from "./definition";
import { Identifier } from "./identifier";
import { JSNode } from "./../generator/js-node";
import { Location } from "../parser/location";
import { Statement } from "./statement";

export class FunctionDefinition extends Definition {
  constructor(
    public readonly loc: Location,
    public readonly returns: Type,
    public readonly name: Identifier,
    public readonly params: Map<string, { id: Identifier; type: Type }>,
  ) {
    super(loc, name);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class FunctionCall extends Statement {
  constructor(
    public readonly loc: Location,
    public readonly params: Statement[],
    public readonly func: FunctionDefinition,
  ) {
    super(loc, func.returns);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
