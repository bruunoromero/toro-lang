import { Module } from "./module";
import { AssignmentExpression } from "./assignment";
import { Import } from "./import";

export class File {
  constructor(
    public readonly module: Module,
    public readonly imports: Import[],
    public readonly assignments: AssignmentExpression[],
  ) {}
}
