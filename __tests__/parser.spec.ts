import { parse } from "../src/parser";

describe("Parser", () => {
  it("Should parse correctly a simple expression", () => {
    const sample = `
(def a true)
`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });

  it("Should parse correctly two consecutives expressions", () => {
    const sample = `
(def a 10)
(def b 10)
`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });
});
