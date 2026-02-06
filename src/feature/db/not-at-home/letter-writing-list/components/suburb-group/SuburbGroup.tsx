import type { FC } from "react";
import { IonLabel } from "@ionic/react";
import { Accordion } from "@ionic-layout/accordion/Accordion";
import { AccordionGroup } from "@ionic-layout/accordion-group/AccordionGroup";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { AccordionContent } from "@ionic-layout/accordion-content/AccordionContent";
import { Text } from "@ionic-display/text/Text";
import { StreetGroup } from "../street-group/StreetGroup";
import type { SuburbGroup as SuburbGroupType } from "../../groupBySuburbAndStreet";

type Props = {
  suburb: SuburbGroupType;
  onDelete: (id: string) => void;
};

export const SuburbGroup: FC<Props> = ({ suburb, onDelete }) => {
  return (
    <Accordion value={suburb.suburbId}>
      <ItemAccordionHeader>
        <IonLabel>
          <Text size="lg" color="primary">
            {suburb.suburbName.toUpperCase()}
          </Text>
        </IonLabel>
      </ItemAccordionHeader>
      <AccordionContent>
        <AccordionGroup multiple>
          {suburb.streets.map((street) => (
            <StreetGroup key={street.streetId} street={street} onDelete={onDelete} />
          ))}
        </AccordionGroup>
      </AccordionContent>
    </Accordion>
  );
};
