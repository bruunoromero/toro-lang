import { Position } from "./../parser/location";
export function duplicatedDefinition(definition: any) {}

export function unexpectedEndOfInput() {
  throw new Error("Unexpected end of input");
}

export function ambiguityFound(found: number) {
  throw new Error(`Could not parse: ambiguity found. ${found} possibilities.`);
}

export function expectingOneOf(where: Position, expected: string[]) {
  throw new Error(
    `expecting one of ${expected} at line: ${where.line} and column: ${
      where.column
    }`,
  );
}
