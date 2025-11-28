import { IonSearchbar } from "@ionic/react";
import type { ComponentProps } from "react";

interface SearchbarProps extends ComponentProps<typeof IonSearchbar> {}

export const Searchbar: React.FC<SearchbarProps> = ({ children, ...props }) => {
  return (
    <IonSearchbar {...props}>
      <strong>{children}</strong>
    </IonSearchbar>
  );
};
