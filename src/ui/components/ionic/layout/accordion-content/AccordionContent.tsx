import type { PropsWithChildren } from "react";

type AccordionContentProps = PropsWithChildren;

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
}) => {
  return <div slot="content">{children}</div>;
};
