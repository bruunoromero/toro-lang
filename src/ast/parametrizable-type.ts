import { Type } from "./type";

export class ParametrizableType extends Type {
  constructor(
    public readonly ctx: any,
    public readonly name: string,
    public readonly ofs: Type[],
  ) {
    super(ctx, name, true);
  }
}
