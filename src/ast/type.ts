import { Node } from "./node";
import { JSNode } from "../generator/js-node";
import { Location } from "../parser/location";
import { Identifier } from "./identifier";

export class Type extends Node {
  constructor(public readonly loc: Location, public readonly name: Identifier) {
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
    public readonly name: Identifier,
    public readonly params: Type[],
  ) {
    super(loc, name);
  }

  get isConcrete() {
    return false;
  }
}
