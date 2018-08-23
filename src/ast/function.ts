import { Map } from "immutable";

import { Body } from "./body";
import { Type } from "./type";
import { Definition } from "./definition";
import { Identifier } from "./identifier";
import { JSNode } from "./../generator/js-node";
import { Location } from "../parser/location";

export class FunctionDefinition extends Definition {
  constructor(
    public readonly loc: Location,
    public readonly name: Identifier,
    public readonly params: Map<string, { id: Identifier; type: Type }>,
  ) {
    super(loc, name);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
