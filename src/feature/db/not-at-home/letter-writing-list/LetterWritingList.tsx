import { useState, type FC } from "react";
import { AccordionGroup } from "@ionic-layout/accordion-group/AccordionGroup";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { groupBySuburbAndStreet } from "./groupBySuburbAndStreet";
import { SuburbGroup } from "./components/suburb-group/SuburbGroup";
import { DeleteAddressAlert } from "./components/delete-address-alert/DeleteAddressAlert";
import { useLetterWritingAddresses } from "./hooks/useLetterWritingAddresses";

export const LetterWritingList: FC = () => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { addresses, suburbs, streets } = useLetterWritingAddresses();

  if (!addresses?.length) {
    return (
      <List>
        <Item lines="none">
          <IonLabel>
            <Text>No letter writing addresses</Text>
          </IonLabel>
        </Item>
      </List>
    );
  }

  const groups = groupBySuburbAndStreet(
    addresses,
    suburbs ?? [],
    streets ?? [],
  );

  return (
    <>
      <AccordionGroup multiple>
        {groups.map((suburb) => (
          <SuburbGroup key={suburb.suburbId} suburb={suburb} onDelete={setDeleteId} />
        ))}
      </AccordionGroup>
      <DeleteAddressAlert deleteId={deleteId} onDismiss={() => setDeleteId(null)} />
    </>
  );
};
