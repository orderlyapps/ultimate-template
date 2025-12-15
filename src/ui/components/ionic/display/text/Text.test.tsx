import { render, screen } from "@services/app/testing/render";
import { Text } from "./Text";

describe("Text", () => {
  it("renders without crashing", () => {
    render(<Text>Hello</Text>);
    const text = document.querySelector("ion-text");
    expect(text).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(<Text>Test content</Text>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders with default size (md) when no size prop provided", () => {
    render(<Text>Default size</Text>);
    const span = document.querySelector("span");
    expect(span).toHaveStyle({ fontSize: "1rem" });
  });

  it("renders with span when bold is false (default)", () => {
    render(<Text>Not bold</Text>);
    const span = document.querySelector("span");
    const strong = document.querySelector("strong");
    expect(span).toBeInTheDocument();
    expect(strong).not.toBeInTheDocument();
  });

  it("renders with strong when bold is true", () => {
    render(<Text bold>Bold text</Text>);
    const strong = document.querySelector("strong");
    const span = document.querySelector("span");
    expect(strong).toBeInTheDocument();
    expect(span).not.toBeInTheDocument();
  });

  it("applies xxs size correctly", () => {
    render(<Text size="xxs">XXS text</Text>);
    const span = document.querySelector("span");
    expect(span).toHaveStyle({ fontSize: "0.65rem" });
  });

  it("applies xs size correctly", () => {
    render(<Text size="xs">XS text</Text>);
    const span = document.querySelector("span");
    expect(span).toHaveStyle({ fontSize: "0.75rem" });
  });

  it("applies sm size correctly", () => {
    render(<Text size="sm">SM text</Text>);
    const span = document.querySelector("span");
    expect(span).toHaveStyle({ fontSize: "0.875rem" });
  });

  it("applies lg size correctly", () => {
    render(<Text size="lg">LG text</Text>);
    const span = document.querySelector("span");
    expect(span).toHaveStyle({ fontSize: "1.15rem" });
  });

  it("applies xl size correctly", () => {
    render(<Text size="xl">XL text</Text>);
    const span = document.querySelector("span");
    expect(span).toHaveStyle({ fontSize: "1.375rem" });
  });

  it("applies xxl size correctly", () => {
    render(<Text size="xxl">XXL text</Text>);
    const span = document.querySelector("span");
    expect(span).toHaveStyle({ fontSize: "1.5" });
  });

  it("applies size to bold text correctly", () => {
    render(
      <Text size="lg" bold>
        Bold LG text
      </Text>
    );
    const strong = document.querySelector("strong");
    expect(strong).toHaveStyle({ fontSize: "1.15rem" });
  });

  it("passes through additional props to IonText", () => {
    render(<Text data-testid="custom-text">Props test</Text>);
    const text = screen.getByTestId("custom-text");
    expect(text).toBeInTheDocument();
  });

  it("applies color prop when provided", () => {
    render(
      <Text color="primary" data-testid="colored-text">
        Colored text
      </Text>
    );
    const text = screen.getByTestId("colored-text");
    expect(text).toHaveAttribute("color", "primary");
  });
});
