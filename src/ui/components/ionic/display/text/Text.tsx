import { IonText } from "@ionic/react";
import type { ComponentProps } from "react";

type TextProps = ComponentProps<typeof IonText> & {
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
  bold?: boolean;
};

const textSize = {
  xxs: "0.65rem",
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.15rem",
  xl: "1.375rem",
  xxl: "1.5rem",
  xxxl: "2rem",
};

export const Text = ({
  children,
  size = "md",
  bold = false,
  ...props
}: TextProps) => {
  if (bold)
    return (
      <IonText {...props}>
        <strong style={{ fontSize: textSize[size] }}>{children}</strong>
      </IonText>
    );

  return (
    <IonText {...props}>
      <span style={{ fontSize: textSize[size] }}>{children}</span>
    </IonText>
  );
};
