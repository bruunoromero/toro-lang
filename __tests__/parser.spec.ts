import { parse } from "../src/parser";
import { pprint } from "../src/utils/print";
describe("Parser", () => {
  it("Should parse correctly a simple expression", () => {
    const sample = `
(def a true)
`;

    expect(() => {
      console.log(parse(sample));
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

  it("Should parse correctly nested expressions", () => {
    const sample = `
(def a (list :test))
`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });

  it("Should parse correctly read macro expressions", () => {
    const sample = `
(fn [a] (println "a"))
`;

    expect(() => {
      parse(sample);
    }).not.toThrow();
  });
});
