import { parse } from "../src/parser";
import { pprint } from "../src/utils/print";

describe("Import", () => {
  it("Should parse", () => {
    const sample = `
import List
import List.Core
`;

    expect(() => {
      const result = parse(sample);
    }).not.toThrow();
  });
});
