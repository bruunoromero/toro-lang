import { Location } from "./../parser/location";
import { Node as JSNode } from "../generator/node";

export abstract class Node {
  constructor(public readonly loc: Location) {}

  abstract transform(): JSNode;
}
