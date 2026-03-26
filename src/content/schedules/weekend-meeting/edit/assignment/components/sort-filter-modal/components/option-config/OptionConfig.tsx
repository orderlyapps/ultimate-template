import { List } from "@ionic-layout/list/List";
import { NullHandlingSelect } from "./components/null-handling-select/NullHandlingSelect";
import { BooleanFilters } from "./components/boolean-filters/BooleanFilters";
import { Label } from "@ionic-display/label/Label";
import { IonAccordion, IonAccordionGroup } from "@ionic/react";
import { useSortFilterAccordionsStore } from "@/content/schedules/weekend-meeting/edit/assignment/store/useSortFilterAccordionsStore";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { Space } from "@layout/space/Space";

export const OptionConfig: React.FC = () => {
  const optionAccordionOpen = useSortFilterAccordionsStore(
    (s) => s.optionAccordionOpen,
  );
  const setOptionAccordionOpen = useSortFilterAccordionsStore(
    (s) => s.setOptionAccordionOpen,
  );

  return (
    <IonAccordionGroup
      value={optionAccordionOpen ? "option" : undefined}
      onIonChange={(e) => setOptionAccordionOpen(e.detail.value === "option")}
    >
      <IonAccordion value="option">
        <ItemAccordionHeader lines={optionAccordionOpen ? "none" : undefined}>
          <Label>Options</Label>
        </ItemAccordionHeader>
        <List slot="content" inset>
          <NullHandlingSelect />
          <BooleanFilters />
          <Space height="2" />
        </List>
      </IonAccordion>
    </IonAccordionGroup>
  );
};
