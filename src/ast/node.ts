import { Location } from "./../parser/location";
import { JSNode } from "../generator/js-node";

export abstract class Node {
  constructor(public readonly loc: Location) {}

  abstract transform(): JSNode;
}

export abstract class ContextNode extends Node {
  transform(): JSNode {
    throw new Error("Method not implemented.");
  }
}
