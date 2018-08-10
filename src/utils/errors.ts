export function duplicatedDefinition(definition: any) {}

export function unexpectedEndOfInput() {
  throw new Error("Unexpected end of input");
}

export function ambiguityFound(found: number) {
  throw new Error(`Could not parse: ambiguity found. ${found} possibilities.`);
}
