import { Type } from "./type";
import { Union, Constructor } from "./union";
import { ParametrizableType } from "./parametrizable-type";
import { Value } from "./value";
import { Identifier } from "./identifier";

export class AnyType extends Type {
  constructor(public readonly ctx: any) {
    super(ctx, "Any");
  }
}

export class IntType extends Type {
  constructor(public readonly ctx: any) {
    super(new Identifier(ctx, "Int"));
  }
}

export class Integer extends Value<number> {
  constructor(public readonly ctx: any, public readonly value: number) {
    super(ctx, new IntType(ctx), value);
  }
}

export class DoubleType extends Type {
  constructor(public readonly ctx: any) {
    super(new Identifier(ctx, "Double"));
  }
}

export class Double extends Value<number> {
  constructor(public readonly ctx: any, public readonly value: number) {
    super(ctx, new DoubleType(ctx), value);
  }
}

export class BooleanType extends Type {
  constructor(public readonly ctx: any) {
    super(ctx, "Bool");
  }
}

export class CharType extends Type {
  constructor(public readonly ctx: any) {
    super(new Identifier(ctx, "Char"));
  }
}

export class Char extends Value<string> {
  constructor(public readonly ctx: any, public readonly value: string) {
    super(ctx, new CharType(ctx), value);
  }
}

export class ListType extends ParametrizableType {
  constructor(public readonly ctx: any, public readonly type: Type) {
    super(ctx, "List", [type]);
  }
}
