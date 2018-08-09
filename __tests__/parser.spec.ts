import { parse } from "../src/parser";
import { pprint } from "../src/utils/print";

describe("Import", () => {
  it("Should parse imports", () => {
    const sample = `
import List
import List.Core
`;

    expect(() => {
      const result = parse(sample);
    }).not.toThrow();
  });
});

describe("Definition", () => {
  it("Should parse definitions", () => {
    const sample = `
def main = {
  def t = {}
}
export def teste = {}
`;

    expect(() => {
      const result = parse(sample);
    }).not.toThrow();
  });
});
