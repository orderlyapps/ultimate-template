import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HelpText } from "./HelpText";
import { useHelpTextStore } from "@services/app/help-text/useHelpTextStore";

describe("HelpText", () => {
  beforeEach(() => {
    // Reset store to default state before each test
    useHelpTextStore.setState({
      dismissedIds: new Set<string>(),
      isGloballyDisabled: false,
    });
  });

  it("should render help text when not dismissed", () => {
    render(<HelpText id="test-help">This is helpful information</HelpText>);
    expect(screen.getByText("This is helpful information")).toBeInTheDocument();
  });

  it("should render dismiss button", () => {
    render(<HelpText id="test-help">Help text</HelpText>);
    expect(
      screen.getByRole("button", { name: /dismiss help text/i })
    ).toBeInTheDocument();
  });

  it("should not render when help text is dismissed", () => {
    const { dismissHelpText } = useHelpTextStore.getState();
    dismissHelpText("test-help");

    render(<HelpText id="test-help">This should not appear</HelpText>);
    expect(
      screen.queryByText("This should not appear")
    ).not.toBeInTheDocument();
  });

  it("should not render when globally disabled", () => {
    const { toggleGlobalDisable } = useHelpTextStore.getState();
    toggleGlobalDisable();

    render(<HelpText id="test-help">This should not appear</HelpText>);
    expect(
      screen.queryByText("This should not appear")
    ).not.toBeInTheDocument();
  });

  it("should dismiss help text when dismiss button is clicked", () => {
    const { rerender } = render(
      <HelpText id="test-help">Help text content</HelpText>
    );

    const dismissButton = screen.getByRole("button", {
      name: /dismiss help text/i,
    });
    fireEvent.click(dismissButton);

    // Re-render to see the effect
    rerender(<HelpText id="test-help">Help text content</HelpText>);

    expect(screen.queryByText("Help text content")).not.toBeInTheDocument();
  });

  it("should show help text after group re-enable", () => {
    const { dismissHelpText, reEnableGroup } = useHelpTextStore.getState();

    // Dismiss help text
    dismissHelpText("onboarding:step-1");

    const { rerender } = render(
      <HelpText id="onboarding:step-1" group="onboarding">
        Onboarding help
      </HelpText>
    );

    expect(screen.queryByText("Onboarding help")).not.toBeInTheDocument();

    // Re-enable group
    reEnableGroup("onboarding");
    rerender(
      <HelpText id="onboarding:step-1" group="onboarding">
        Onboarding help
      </HelpText>
    );

    expect(screen.getByText("Onboarding help")).toBeInTheDocument();
  });

  it("should render children correctly", () => {
    render(
      <HelpText id="test-help">
        <div>
          <strong>Bold text</strong> and <em>italic text</em>
        </div>
      </HelpText>
    );

    expect(screen.getByText("Bold text")).toBeInTheDocument();
    expect(screen.getByText("italic text")).toBeInTheDocument();
  });

  it("should handle multiple help texts independently", () => {
    const { rerender } = render(
      <>
        <HelpText id="help-1">First help text</HelpText>
        <HelpText id="help-2">Second help text</HelpText>
      </>
    );

    expect(screen.getByText("First help text")).toBeInTheDocument();
    expect(screen.getByText("Second help text")).toBeInTheDocument();

    // Dismiss only the first one
    const dismissButtons = screen.getAllByRole("button", {
      name: /dismiss help text/i,
    });
    fireEvent.click(dismissButtons[0]);

    // Re-render with same components
    rerender(
      <>
        <HelpText id="help-1">First help text</HelpText>
        <HelpText id="help-2">Second help text</HelpText>
      </>
    );

    expect(screen.queryByText("First help text")).not.toBeInTheDocument();
    expect(screen.getByText("Second help text")).toBeInTheDocument();
  });
});
