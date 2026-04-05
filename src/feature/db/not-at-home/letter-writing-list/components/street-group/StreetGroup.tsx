import type { FC } from "react";
import { IonLabel } from "@ionic/react";
import { Accordion } from "@ionic-layout/accordion/Accordion";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { AccordionContent } from "@ionic-layout/accordion-content/AccordionContent";
import { AddressRow } from "../address-row/AddressRow";
import type { StreetGroup as StreetGroupType } from "../../groupBySuburbAndStreet";
import { LabelText } from "@display/label-text/LabelText";

type Props = {
  street: StreetGroupType;
  onDelete: (id: string) => void;
};

export const StreetGroup: FC<Props> = ({ street, onDelete }) => {
  return (
    <Accordion value={street.streetId}>
      <ItemAccordionHeader>
        <IonLabel>
          <LabelText>{street.streetName}</LabelText>
        </IonLabel>
      </ItemAccordionHeader>
      <AccordionContent>
        {street.addresses.map((address) => (
          <AddressRow key={address.id} address={address} onDelete={onDelete} />
        ))}
      </AccordionContent>
    </Accordion>
  );
};
