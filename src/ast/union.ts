import { Type } from "./type";
import { Value } from "./value";

export class Constructor {
  constructor(
    public readonly parent: Union,
    public readonly types: Type[],
    public readonly name: string,
  ) {}
}

export class Union extends Type implements Type {
  constructor(
    public readonly name: string,
    public readonly types: Type[],
    public readonly constructors: Map<string, Constructor>,
  ) {
    super(name);
  }
}

// type Either(Int, String)
//   = Left(Int)
//   | Right(String)
//   ;
