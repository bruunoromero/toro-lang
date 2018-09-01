import { Identifier } from "./identifier";
import { Node } from "./node";
import { Statement } from "./statement";
import { Location } from "../parser/location";
import { JSNode } from "../generator/js-node";

export class RecordLiteral extends Statement {
  constructor(
    public readonly loc: Location,
    public readonly properties: RecordProperty[],
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class RecordUpdate extends Statement {
  constructor(
    public readonly loc: Location,
    public readonly id: Identifier,
    public readonly properties: RecordProperty[],
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}

export class RecordProperty extends Node {
  constructor(
    public readonly loc: Location,
    public readonly key: Identifier,
    public readonly value: Statement,
  ) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
