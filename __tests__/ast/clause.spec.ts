import { Clause } from "../../src/ast/clause";
import { ImportClause } from "./../../src/ast/import-clause";

class TestClause extends Clause {}

let clause;

beforeAll(() => {
  clause = new TestClause();
});

describe("Clause", () => {
  it(
    "Should return true when calling `is` " +
      "function with its constructor as parameter",
    () => {
      expect(clause.is(TestClause)).toBe(true);
    },
  );

  it(
    "Should return false when calling `is` " +
      "function with other constructor besides " +
      "its own constructor as parameter",
    () => {
      expect(clause.is(ImportClause)).toBe(false);
    },
  );
});
