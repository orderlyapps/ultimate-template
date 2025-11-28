import { Text } from "@ionic-display/text/Text";
import { IonItem, IonLabel } from "@ionic/react";

export const NavItem = ({
  children,
  routerLink,
}: {
  children: string;
  routerLink: string;
}) => {
  return (
    <IonItem routerLink={routerLink}>
      <IonLabel color="primary" className="ion-margin">
        <Text size="xl">{children}</Text>
      </IonLabel>
    </IonItem>
  );
};
