import { IonAccordionGroup } from "@ionic/react";
import type { ComponentProps } from "react";

type AccordionGroupProps = ComponentProps<typeof IonAccordionGroup>;

export const AccordionGroup: React.FC<AccordionGroupProps> = ({
  children,
  ...props
}) => {
  return <IonAccordionGroup {...props}>{children}</IonAccordionGroup>;
};
