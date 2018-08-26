import { Grammar } from "../src/parser/grammar";
import { StringLiteral } from "./../src/ast/string";
import { DoubleLiteral } from "./../src/ast/double";

describe("Operator", () => {
  it("Should parse an unparented left associative expression", () => {
    const { status, value } = Grammar.OperatorExpression.parse(
      "1 + 2 * 3 / 4",
    ) as any;

    expect(status).toBe(true);
    expect(value.name.name).toBe("+");
    expect(value.left.value).toBe(1);
    expect(value.right.name.name).toBe("/");
    expect(value.right.left.name.name).toBe("*");
    expect(value.right.left.left.value).toBe(2);
    expect(value.right.left.right.value).toBe(3);
    expect(value.right.right.value).toBe(4);
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
