import { Identifier } from "./identifier";
import { Type } from "./type";

export class ParametrizableType extends Type {
  constructor(
    public readonly ctx: any,
    public readonly name: Identifier,
    public readonly ofs: Type[],
  ) {
    super(name, true);
  }
}
