import { render, screen } from "@feature/testing/render";
import { SelectTheme } from "./SelectTheme";
import { useThemeStore } from "./themeStore";
import { act } from "@testing-library/react";

describe("SelectTheme", () => {
  beforeEach(() => {
    // Reset store to default state before each test
    act(() => {
      useThemeStore.setState({ preference: "system" });
    });
  });

  it("renders without crashing", () => {
    render(<SelectTheme />);
    const item = document.querySelector("ion-item");
    expect(item).toBeInTheDocument();
  });

  it("renders the Theme label", () => {
    render(<SelectTheme />);
    expect(screen.getByText("Theme")).toBeInTheDocument();
  });

  it("renders all theme options", () => {
    render(<SelectTheme />);
    expect(screen.getByText("System")).toBeInTheDocument();
    expect(screen.getByText("Light")).toBeInTheDocument();
    expect(screen.getByText("Dark")).toBeInTheDocument();
  });

  it("displays the current theme preference from store", () => {
    act(() => {
      useThemeStore.setState({ preference: "dark" });
    });
    render(<SelectTheme />);
    const select = document.querySelector("ion-select");
    expect(select).toHaveAttribute("value", "dark");
  });

  it("has three theme options available", () => {
    render(<SelectTheme />);
    const selectOptions = document.querySelectorAll("ion-select-option");
    expect(selectOptions).toHaveLength(3);
  });
});
