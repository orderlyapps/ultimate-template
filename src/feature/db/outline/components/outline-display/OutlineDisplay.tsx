import type { FC } from "react";
import { Text } from "@ionic-display/text/Text";

/**
 * Props for the OutlineDisplay component
 */
type OutlineDisplayProps = {
  /** The outline object containing id and theme to display */
  outline: { id?: string; theme?: string };
  /** Whether the text should be bold */
  bold?: boolean;
  /** Size variant for the text */
  size?: "xs" | "sm" | "md" | "lg";
};

/**
 * Displays an outline's ID and theme in a consistent format.
 * When the text wraps to a second line, the second line is indented
 * to align with the theme text (after the ID and separator).
 *
 * @example
 * <OutlineDisplay outline={{ id: "1", theme: "The theme text" }} />
 * <OutlineDisplay outline={{ id: "1", theme: "The theme text" }} bold />
 */
export const OutlineDisplay: FC<OutlineDisplayProps> = ({
  outline,
  bold = false,
  size = "sm",
}) => {
  if (!outline?.id || !outline?.theme) return null;

  const prefixWidth = `${outline.id.length + 3}ch`; // ID + " - "

  return (
    <Text bold={bold} size={size}>
      <span
        style={{
          display: "inline-block",
          paddingLeft: prefixWidth,
          textIndent: `-${prefixWidth}`,
        }}
      >
        {outline.id} - {outline.theme}
      </span>
    </Text>
  );
};
