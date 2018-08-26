import { Grammar } from "../src/parser/grammar";
import { StringLiteral } from "./../src/ast/string";
import { DoubleLiteral } from "./../src/ast/double";
import { IntegerLiteral } from "./../src/ast/integer";

describe("Primary", () => {
  it("Should parse a positive Integer literal", () => {
    const { status, value } = Grammar.Primary.parse("10") as any;

    expect(status).toBe(true);
    expect((value as IntegerLiteral).value).toBe(10);
  });

  it("Should parse a positive Double literal", () => {
    const { status, value } = Grammar.Primary.parse("10.10") as any;

    expect(status).toBe(true);
    expect((value as DoubleLiteral).value).toBe(10.1);
  });

  it("Should parse a String literal", () => {
    const { status, value } = Grammar.Primary.parse('"Hello, world"') as any;

    expect(status).toBe(true);
    expect((value as StringLiteral).value).toBe("Hello, world");
  });

  it("Should fail to parse malformed primary literals", () => {
    expect(Grammar.Primary.parse("-10").status).toBe(false);
    expect(Grammar.Primary.parse("*10").status).toBe(false);
    expect(Grammar.Primary.parse("+10.0").status).toBe(false);
    expect(Grammar.Primary.parse("*10.0").status).toBe(false);
    expect(Grammar.Primary.parse("'Hello world'").status).toBe(false);
    expect(Grammar.Primary.parse('+"Hello world"').status).toBe(false);
  });
});