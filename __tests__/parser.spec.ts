import { parse } from "../src/parser";
describe("Parser", () => {
  it("Should parse correctly a simple module", () => {
    const sample = `module Main exposing(List)`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });

  it("Should parse correctly a complex module", () => {
    const sample = `
module Main exposing(List)

import List.Core as C exposing (List)

def main() {}
`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });
});
