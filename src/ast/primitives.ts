import { Type } from "./type";
import { Union, Constructor } from "./union";

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

export class ArrayType extends Union {
  constructor(public readonly type: Type) {
    super("Array", [type], new Map());

    this.constructors.set("Array", new Constructor(this, [type], "Array"));
  }
}

// type Array(Any) = Array(Any)

// Array(Array(10))
