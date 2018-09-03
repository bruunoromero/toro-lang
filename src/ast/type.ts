import { ContextNode } from "./node";
import { Identifier } from "./identifier";
import { Location } from "./location";

export class Type extends ContextNode {
  constructor(loc: Location) {
    super(loc);
  }

  get isConcrete() {
    return true;
  }
}

export class FirstTypeNode extends Type {
  constructor(
    public readonly id: Identifier,
    public readonly next?: FirstTypeNode,
  ) {
    super(id.loc);
  }

  static fromMultiple(ids: Identifier[]): FirstTypeNode {
    return ids
      .slice(1)
      .reduce((acc, curr) => acc.push(curr), new FirstTypeNode(ids[0]));
  }

  push(id: Identifier): FirstTypeNode {
    if (this.next) {
      return this.next.push(id);
    } else {
      return new FirstTypeNode(this.id, new FirstTypeNode(id));
    }
  }

  map<T>(fn: (id: Identifier) => T): T[] {
    const res = [];
    let curr: FirstTypeNode | undefined = this;

    do {
      res.push(fn(curr.id));
      curr = curr.next;
    } while (curr);

    return res;
  }
}

export class TypeParameter extends FirstTypeNode {
  get isConcrete() {
    return false;
  }
}

export class Generic extends Type {
  constructor(
    loc: Location,
    public readonly id: FirstTypeNode,
    public readonly params: Type[],
  ) {
    super(loc);
  }

  get isConcrete() {
    return false;
  }
}
