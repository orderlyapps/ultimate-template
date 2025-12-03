import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";

export const NavItem = ({
  children,
  routerLink,
}: {
  children: string;
  routerLink: string;
}) => {
  return (
    <Item routerLink={routerLink}>
      <Label color="primary" className="ion-margin">
        <Text size="xl">{children}</Text>
      </Label>
    </Item>
  );
};
