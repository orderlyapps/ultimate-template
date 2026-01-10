import { IonSearchbar } from "@ionic/react";
import type { ComponentProps } from "react";

type SearchbarProps = ComponentProps<typeof IonSearchbar>;

export const Searchbar: React.FC<SearchbarProps> = ({ children, ...props }) => {
  const defaultProps = {
    ...props,
    placeholder: "Search...",
    showClearButton: "always" as "always" | "never" | "focus" | undefined,
    debounce: 200,
  };

  return (
    <IonSearchbar {...defaultProps}>
      <strong>{children}</strong>
    </IonSearchbar>
  );
};
