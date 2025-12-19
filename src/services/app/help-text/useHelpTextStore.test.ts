import { describe, it, expect, beforeEach } from "vitest";
import { useHelpTextStore } from "./useHelpTextStore";

describe("useHelpTextStore", () => {
  beforeEach(() => {
    // Reset store to default state before each test
    useHelpTextStore.setState({
      dismissedIds: new Set<string>(),
      isGloballyDisabled: false,
    });
  });

  describe("default state", () => {
    it("should have empty dismissedIds set", () => {
      const { dismissedIds } = useHelpTextStore.getState();
      expect(dismissedIds.size).toBe(0);
    });

    it("should have isGloballyDisabled as false", () => {
      const { isGloballyDisabled } = useHelpTextStore.getState();
      expect(isGloballyDisabled).toBe(false);
    });
  });

  describe("dismissHelpText", () => {
    it("should add help text id to dismissedIds", () => {
      const { dismissHelpText } = useHelpTextStore.getState();
      dismissHelpText("test-help-1");

      const { dismissedIds } = useHelpTextStore.getState();
      expect(dismissedIds.has("test-help-1")).toBe(true);
    });

    it("should add multiple help text ids", () => {
      const { dismissHelpText } = useHelpTextStore.getState();
      dismissHelpText("test-help-1");
      dismissHelpText("test-help-2");
      dismissHelpText("group1:help-1");

      const { dismissedIds } = useHelpTextStore.getState();
      expect(dismissedIds.size).toBe(3);
      expect(dismissedIds.has("test-help-1")).toBe(true);
      expect(dismissedIds.has("test-help-2")).toBe(true);
      expect(dismissedIds.has("group1:help-1")).toBe(true);
    });

    it("should not add duplicate ids", () => {
      const { dismissHelpText } = useHelpTextStore.getState();
      dismissHelpText("test-help-1");
      dismissHelpText("test-help-1");

      const { dismissedIds } = useHelpTextStore.getState();
      expect(dismissedIds.size).toBe(1);
    });
  });

  describe("toggleGlobalDisable", () => {
    it("should toggle isGloballyDisabled from false to true", () => {
      const { toggleGlobalDisable } = useHelpTextStore.getState();
      toggleGlobalDisable();

      const { isGloballyDisabled } = useHelpTextStore.getState();
      expect(isGloballyDisabled).toBe(true);
    });

    it("should toggle isGloballyDisabled from true to false", () => {
      const { toggleGlobalDisable } = useHelpTextStore.getState();
      toggleGlobalDisable();
      expect(useHelpTextStore.getState().isGloballyDisabled).toBe(true);

      toggleGlobalDisable();
      expect(useHelpTextStore.getState().isGloballyDisabled).toBe(false);
    });

    it("should toggle multiple times", () => {
      const { toggleGlobalDisable } = useHelpTextStore.getState();

      toggleGlobalDisable();
      expect(useHelpTextStore.getState().isGloballyDisabled).toBe(true);

      toggleGlobalDisable();
      expect(useHelpTextStore.getState().isGloballyDisabled).toBe(false);

      toggleGlobalDisable();
      expect(useHelpTextStore.getState().isGloballyDisabled).toBe(true);
    });
  });

  describe("reEnableGroup", () => {
    it("should remove all help text ids with matching group prefix", () => {
      const { dismissHelpText, reEnableGroup } = useHelpTextStore.getState();

      dismissHelpText("group1:help-1");
      dismissHelpText("group1:help-2");
      dismissHelpText("group2:help-1");
      dismissHelpText("standalone-help");

      expect(useHelpTextStore.getState().dismissedIds.size).toBe(4);

      reEnableGroup("group1");

      const { dismissedIds } = useHelpTextStore.getState();
      expect(dismissedIds.size).toBe(2);
      expect(dismissedIds.has("group1:help-1")).toBe(false);
      expect(dismissedIds.has("group1:help-2")).toBe(false);
      expect(dismissedIds.has("group2:help-1")).toBe(true);
      expect(dismissedIds.has("standalone-help")).toBe(true);
    });

    it("should not affect other groups", () => {
      const { dismissHelpText, reEnableGroup } = useHelpTextStore.getState();

      dismissHelpText("onboarding:step-1");
      dismissHelpText("onboarding:step-2");
      dismissHelpText("features:feature-1");

      reEnableGroup("onboarding");

      const { dismissedIds } = useHelpTextStore.getState();
      expect(dismissedIds.has("features:feature-1")).toBe(true);
    });

    it("should handle non-existent group gracefully", () => {
      const { dismissHelpText, reEnableGroup } = useHelpTextStore.getState();

      dismissHelpText("group1:help-1");
      reEnableGroup("nonexistent");

      const { dismissedIds } = useHelpTextStore.getState();
      expect(dismissedIds.size).toBe(1);
      expect(dismissedIds.has("group1:help-1")).toBe(true);
    });
  });

  describe("shouldShow", () => {
    it("should return true for non-dismissed help text", () => {
      const { shouldShow } = useHelpTextStore.getState();
      expect(shouldShow("test-help-1")).toBe(true);
    });

    it("should return false for dismissed help text", () => {
      const { dismissHelpText, shouldShow } = useHelpTextStore.getState();
      dismissHelpText("test-help-1");
      expect(shouldShow("test-help-1")).toBe(false);
    });

    it("should return false when globally disabled", () => {
      const { toggleGlobalDisable, shouldShow } = useHelpTextStore.getState();
      toggleGlobalDisable();
      expect(shouldShow("test-help-1")).toBe(false);
    });

    it("should return false for dismissed help text even when globally enabled", () => {
      const { dismissHelpText, shouldShow } = useHelpTextStore.getState();
      dismissHelpText("test-help-1");
      expect(shouldShow("test-help-1")).toBe(false);
    });

    it("should return true after re-enabling group", () => {
      const { dismissHelpText, reEnableGroup, shouldShow } =
        useHelpTextStore.getState();

      dismissHelpText("group1:help-1");
      expect(shouldShow("group1:help-1")).toBe(false);

      reEnableGroup("group1");
      expect(shouldShow("group1:help-1")).toBe(true);
    });
  });

  describe("integration scenarios", () => {
    it("should handle complete workflow: dismiss, global disable, re-enable group", () => {
      const {
        dismissHelpText,
        toggleGlobalDisable,
        reEnableGroup,
        shouldShow,
      } = useHelpTextStore.getState();

      // Dismiss some help texts
      dismissHelpText("onboarding:step-1");
      dismissHelpText("onboarding:step-2");
      dismissHelpText("features:feature-1");

      expect(shouldShow("onboarding:step-1")).toBe(false);
      expect(shouldShow("features:feature-1")).toBe(false);

      // Enable global disable
      toggleGlobalDisable();
      expect(shouldShow("new-help")).toBe(false);

      // Disable global disable
      toggleGlobalDisable();
      expect(shouldShow("new-help")).toBe(true);

      // Re-enable onboarding group
      reEnableGroup("onboarding");
      expect(shouldShow("onboarding:step-1")).toBe(true);
      expect(shouldShow("onboarding:step-2")).toBe(true);
      expect(shouldShow("features:feature-1")).toBe(false);
    });
  });
});
