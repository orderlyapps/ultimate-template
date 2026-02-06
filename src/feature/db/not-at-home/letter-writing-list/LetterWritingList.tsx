import { useState, type FC } from "react";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { notAtHomeCollection } from "@tanstack-db/not_at_home/notAtHomeCollection";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";
import { AccordionGroup } from "@ionic-layout/accordion-group/AccordionGroup";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { groupBySuburbAndStreet } from "./groupBySuburbAndStreet";
import { SuburbGroup } from "./components/suburb-group/SuburbGroup";
import { DeleteAddressAlert } from "./components/delete-address-alert/DeleteAddressAlert";

export const LetterWritingList: FC = () => {
  const [userCongregation] = useUserCongregation();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: writeAddresses } = useLiveQuery(
    (q) =>
      userCongregation?.id
        ? q
            .from({ nah: notAtHomeCollection })
            .where(({ nah }) => eq(nah.congregation_id, userCongregation.id))
            .where(({ nah }) => eq(nah.write, true))
        : undefined,
    [userCongregation?.id],
  );

  const { data: suburbs } = useLiveQuery(
    (q) =>
      userCongregation?.id
        ? q
            .from({ s: suburbCollection })
            .where(({ s }) => eq(s.congregation_id, userCongregation.id))
        : undefined,
    [userCongregation?.id],
  );

  const { data: streets } = useLiveQuery(
    (q) =>
      userCongregation?.id
        ? q
            .from({ s: streetCollection })
            .where(({ s }) => eq(s.congregation_id, userCongregation.id))
        : undefined,
    [userCongregation?.id],
  );

  if (!writeAddresses?.length) {
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
    writeAddresses,
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
