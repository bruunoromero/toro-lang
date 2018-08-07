import { Type } from "./type";

export class ParametrizableType extends Type {
  constructor(public readonly name: string, public readonly ofs: Type[]) {
    super(name, true);
  }
}
