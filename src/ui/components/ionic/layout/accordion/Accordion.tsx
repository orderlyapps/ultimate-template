import { IonAccordion } from "@ionic/react";
import type { ComponentProps } from "react";

type AccordionProps = ComponentProps<typeof IonAccordion>;

export const Accordion: React.FC<AccordionProps> = ({
  children,
  ...props
}) => {
  return <IonAccordion {...props}>{children}</IonAccordion>;
};
