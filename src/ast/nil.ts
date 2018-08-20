import { Primitive } from "./primitive";

export class Nil extends Primitive<null> {
  constructor(public readonly ctx: any) {
    super(ctx, null);
  }
}
