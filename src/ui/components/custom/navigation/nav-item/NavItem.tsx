import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { IonLabel } from "@ionic/react";

export const NavItem = ({
  children,
  routerLink,
}: {
  children: string;
  routerLink: string;
}) => {
  return (
    <Item routerLink={routerLink}>
      <IonLabel color="primary" className="ion-margin">
        <Text size="xl">{children}</Text>
      </IonLabel>
    </Item>
  );
};
