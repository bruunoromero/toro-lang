import { Type } from "./type";
import { Union, Constructor } from "./union";
import { ParametrizableType } from "./parametrizable-type";

export class AnyType extends Type {
  constructor(public readonly ctx: any) {
    super(ctx, "Any");
  }
}

export class IntType extends Type {
  constructor(public readonly ctx: any) {
    super(ctx, "Int");
  }
}

export class DoubleType extends Type {
  constructor(public readonly ctx: any) {
    super(ctx, "Double");
  }
}

export class BooleanType extends Type {
  constructor(public readonly ctx: any) {
    super(ctx, "Bool");
  }
}

export class CharType extends Type {
  constructor(public readonly ctx: any) {
    super(ctx, "Char");
  }
}

export class ListType extends ParametrizableType {
  constructor(public readonly ctx: any, public readonly type: Type) {
    super(ctx, "List", [type]);
  }
}
