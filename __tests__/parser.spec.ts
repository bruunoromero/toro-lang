import { parse } from "../src/parser";
describe("Parser", () => {
  it("Should parse correctly a simple module", () => {
    const sample = `module Main`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });

  it("Should parse correctly a complex module", () => {
    const sample = `module Main exposing ()`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });
});
