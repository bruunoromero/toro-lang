import { Type } from "./type";
import { Union, Constructor } from "./union";
import { ParametrizableType } from "./parametrizable-type";

export class AnyType extends Type {
  constructor() {
    super("Any");
  }
}

export class IntType extends Type {
  constructor() {
    super("Int");
  }
}

export class DoubleType extends Type {
  constructor() {
    super("Double");
  }
}

export class BooleanType extends Type {
  constructor() {
    super("Bool");
  }
}

export class CharType extends Type {
  constructor() {
    super("Char");
  }
}

export class ListType extends ParametrizableType {
  constructor(public readonly type: Type) {
    super("List", [type]);
  }
}
