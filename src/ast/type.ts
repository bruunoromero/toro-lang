import { Node } from "./node";
import { JSNode } from "../generator/js-node";
import { Location } from "../parser/location";
import { Identifier } from "./identifier";

export class Type extends Node {
  constructor(public readonly loc: Location, public readonly id: Identifier) {
    super(loc);
  }

  transform(): JSNode {
    throw new Error("Method not implemented.");
  }

  get isConcrete() {
    return true;
  }
}

export class TypeParameter extends Type {
  get isConcrete() {
    return false;
  }
}

export class Generic extends Type {
  constructor(
    public readonly loc: Location,
    public readonly id: Identifier,
    public readonly params: Type[],
  ) {
    super(loc, id);
  }

  get isConcrete() {
    return false;
  }
}
