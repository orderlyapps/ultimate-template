import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import { IonListHeader } from "@ionic/react";
import { Label } from "@ionic-display/label/Label";

type Props = {
  title: string;
  items: string[] | undefined;
};

export const SimpleListSection: React.FC<Props> = ({ title, items }) => {
  if (!items) return null;

  return (
    <List>
      <IonListHeader>
        <Label>
          {title} ({items.length})
        </Label>
      </IonListHeader>
      {items.length === 0 ? (
        <Item>
          <Text color="medium">None</Text>
        </Item>
      ) : (
        items.map((item, idx) => (
          <Item key={`${title}-${idx}`}>
            <Text>{item}</Text>
          </Item>
        ))
      )}
    </List>
  );
};
