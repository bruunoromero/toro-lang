import { Value } from "./value";
import { Clause } from "./clause";
import { Identifier } from "./identifier";

export class Operator extends Clause {
  constructor(public readonly op: Identifier) {
    super(null);
  }
}

export class UnaryOperator extends Operator {
  constructor(
    public readonly op: Identifier,
    public readonly value?: Value<any>,
  ) {
    super(op);
  }
}

export class BinaryOperator extends Operator {
  constructor(
    public readonly op: Identifier,
    public readonly left?: Value<any>,
    public readonly right?: Value<any>,
  ) {
    super(op);
  }
}

export class PipeOperator extends BinaryOperator {
  constructor(
    public readonly ctx: any,
    public readonly left?: any,
    public readonly right?: any,
  ) {
    super(new Identifier(ctx, "|>"), left, right);
  }
}

export class UnarySubtraction extends UnaryOperator {
  constructor(public readonly ctx: any, public readonly value?: Value<any>) {
    super(new Identifier(ctx, "-"));
  }
}

export class Multiplication extends BinaryOperator {
  constructor(
    public readonly ctx: any,
    public readonly left?: Value<any>,
    public readonly right?: Value<any>,
  ) {
    super(new Identifier(ctx, "*"));
  }
}

export class Division extends BinaryOperator {
  constructor(
    public readonly ctx: any,
    public readonly left?: Value<any>,
    public readonly right?: Value<any>,
  ) {
    super(new Identifier(ctx, "/"));
  }
}

export class Addition extends BinaryOperator {
  constructor(
    public readonly ctx: any,
    public readonly left?: Value<any>,
    public readonly right?: Value<any>,
  ) {
    super(new Identifier(ctx, "+"));
  }
}

export class Subtraction extends BinaryOperator {
  constructor(
    public readonly ctx: any,
    public readonly left?: Value<any>,
    public readonly right?: Value<any>,
  ) {
    super(new Identifier(ctx, "-"));
  }
}
