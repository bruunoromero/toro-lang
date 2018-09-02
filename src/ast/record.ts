import { Type } from "./type";
import { ContextNode } from "./node";
import { Statement } from "./statement";
import { Identifier } from "./identifier";
import { Location } from "./location";
import { JSNode } from "../generator/js-node";

export class RecordPropertyType extends ContextNode {
  constructor(
    public readonly loc: Location,
    public readonly key: Identifier,
    public readonly type: Type,
  ) {
    super(loc);
  }
}

export class RecordType extends Type {
  constructor(
    public readonly loc: Location,
    public readonly id: Identifier,
    public readonly properties: RecordPropertyType[],
  ) {
    super(loc);
  }
}

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

export class RecordProperty extends ContextNode {
  constructor(
    public readonly loc: Location,
    public readonly key: Identifier,
    public readonly value: Statement,
  ) {
    super(loc);
  }
}
