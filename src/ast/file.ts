import { Module } from "./module";
import { Import, Extern } from "./import";
import { AssignmentExpression } from "./assignment";

export class File {
  constructor(
    public readonly module: Module,
    public readonly imports: Import[],
    public readonly externs: Extern[],
    public readonly assignments: AssignmentExpression[],
  ) {}
}
