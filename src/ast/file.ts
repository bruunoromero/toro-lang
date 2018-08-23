import { Module } from "./module";
import { Definition } from "./definition";
import { Import } from "./import";

export class File {
  constructor(
    public readonly module: Module,
    public readonly imports: Import[],
    public readonly definitions: Definition[],
  ) {}
}
