import { IonSearchbar } from "@ionic/react";
import type { ComponentProps } from "react";

type SearchbarProps = ComponentProps<typeof IonSearchbar>;

export const Searchbar: React.FC<SearchbarProps> = ({ children, ...props }) => {
  return (
    <IonSearchbar {...props}>
      <strong>{children}</strong>
    </IonSearchbar>
  );
};
