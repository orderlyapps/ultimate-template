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

  it("updates the store when a new theme is selected", () => {
    render(<SelectTheme />);
    const select = document.querySelector("ion-select");

    act(() => {
      select?.dispatchEvent(
        new CustomEvent("ionChange", {
          detail: { value: "dark" },
          bubbles: true,
        })
      );
    });

    expect(useThemeStore.getState().preference).toBe("dark");
  });

  it("updates the store when switching to light theme", () => {
    act(() => {
      useThemeStore.setState({ preference: "dark" });
    });
    render(<SelectTheme />);
    const select = document.querySelector("ion-select");

    act(() => {
      select?.dispatchEvent(
        new CustomEvent("ionChange", {
          detail: { value: "light" },
          bubbles: true,
        })
      );
    });

    expect(useThemeStore.getState().preference).toBe("light");
  });

  it("updates the store when switching to system theme", () => {
    act(() => {
      useThemeStore.setState({ preference: "light" });
    });
    render(<SelectTheme />);
    const select = document.querySelector("ion-select");

    act(() => {
      select?.dispatchEvent(
        new CustomEvent("ionChange", {
          detail: { value: "system" },
          bubbles: true,
        })
      );
    });

    expect(useThemeStore.getState().preference).toBe("system");
  });
});
