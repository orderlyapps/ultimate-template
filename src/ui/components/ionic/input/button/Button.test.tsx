import { describe, it, expect } from "vitest";
import { render, screen } from "@services/app/testing/render";
import { Button } from "./Button";

describe("Button", () => {
  it("should render children", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should have default className 'ion-margin'", () => {
    render(<Button>Test</Button>);

    const button = document.querySelector("ion-button");
    expect(button).toHaveClass("ion-margin");
  });

  it("should have default expand 'block'", () => {
    render(<Button>Test</Button>);

    const button = document.querySelector("ion-button");
    expect(button).toHaveAttribute("expand", "block");
  });

  it("should allow overriding className", () => {
    render(<Button className="custom-class">Test</Button>);

    const button = document.querySelector("ion-button");
    expect(button).toHaveClass("custom-class");
  });

  it("should allow overriding expand", () => {
    render(<Button expand="full">Test</Button>);

    const button = document.querySelector("ion-button");
    expect(button).toHaveAttribute("expand", "full");
  });

  it("should pass through additional props", () => {
    render(<Button color="danger">Test</Button>);

    const button = document.querySelector("ion-button");
    expect(button).toHaveAttribute("color", "danger");
  });

  it("should render with different fill variants", () => {
    render(<Button fill="outline">Outline</Button>);

    const button = document.querySelector("ion-button");
    expect(button).toHaveAttribute("fill", "outline");
  });

  it("should render with different sizes", () => {
    render(<Button size="small">Small</Button>);

    const button = document.querySelector("ion-button");
    expect(button).toHaveAttribute("size", "small");
  });
});
