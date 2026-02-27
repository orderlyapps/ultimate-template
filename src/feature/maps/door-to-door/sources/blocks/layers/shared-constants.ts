import { JW_BLUE } from "@ui/colors/colors";

export const getSharedConstants = (isDark: boolean) => ({
  color: isDark ? JW_BLUE.dark.base : JW_BLUE.light.base,
  labelColor: isDark ? JW_BLUE.dark.base : JW_BLUE.light.base,
  labelSize: ["interpolate", ["linear"], ["zoom"], 14, 11, 23, 50],
});
