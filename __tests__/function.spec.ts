import { Grammar } from "../src/parser/grammar";
import { StringLiteral } from "./../src/ast/string";
import { DoubleLiteral } from "./../src/ast/double";
import { IntegerLiteral } from "./../src/ast/integer";

describe("Function", () => {
  it("Should parse a positive Integer literal", () => {
    const { status, value } = Grammar.Primary.parse("10") as any;

    expect(status).toBe(true);
    expect((value as IntegerLiteral).value).toBe(10);
  });
});
