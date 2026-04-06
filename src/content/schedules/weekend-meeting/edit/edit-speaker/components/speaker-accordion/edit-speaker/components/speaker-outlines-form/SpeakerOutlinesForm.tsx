import { useState } from "react";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { Checkbox } from "@ionic-input/checkbox/Checkbox";
import { IonAccordion, IonAccordionGroup, IonListHeader } from "@ionic/react";
import { Label } from "@ionic-display/label/Label";
import { useLiveQuery } from "@tanstack/react-db";
import { outlineCollection } from "@tanstack-db/outline/outlineCollection";
import { sortByNumberString } from "@sort/sortByNumberString";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { Space } from "@layout/space/Space";

type SpeakerOutlinesFormProps = {
  selectedOutlineIds: string[];
  onToggleOutline: (outlineId: string) => void;
};

export const SpeakerOutlinesForm: React.FC<SpeakerOutlinesFormProps> = ({
  selectedOutlineIds,
  onToggleOutline,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: outlines = [] } = useLiveQuery((q) =>
    q.from({ o: outlineCollection }).select(({ o }) => ({
      id: o.id,
      theme: o.theme,
    })),
  );

  const assignedOutlines = outlines
    .filter((o) => selectedOutlineIds.includes(o.id))
    .sort(sortByNumberString("id"));

  const filtered = outlines
    .filter(
      (o) =>
        o.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.id.includes(searchQuery),
    )
    .sort(sortByNumberString("id"));

  return (
    <>
      <List>
        <IonListHeader>
          <Label>Assigned Outlines</Label>
        </IonListHeader>
        {assignedOutlines.length === 0 ? (
          <Item>
            <Text color="medium">No outlines assigned</Text>
          </Item>
        ) : (
          assignedOutlines.map((outline) => (
            <Item key={outline.id} onClick={() => onToggleOutline(outline.id)}>
              <Checkbox slot="end" checked={true} onIonChange={() => {}} />
              <Text size="xs">
                {outline.id} - {outline.theme}
              </Text>
            </Item>
          ))
        )}
      </List>

      <Space height="1.5" />
      <List>
        <IonAccordionGroup>
          <IonAccordion value="all-outlines">
            <ItemAccordionHeader>
              <Label>Outline List</Label>
            </ItemAccordionHeader>
            <List slot="content">
              <Item lines="none">
                <Searchbar
                  value={searchQuery}
                  onIonInput={(e) => setSearchQuery(e.detail.value ?? "")}
                  placeholder="Search outlines..."
                  debounce={300}
                />
              </Item>
              {filtered.map((outline) => (
                <Item
                  key={outline.id}
                  onClick={() => onToggleOutline(outline.id)}
                >
                  <Checkbox
                    slot="end"
                    checked={selectedOutlineIds.includes(outline.id)}
                    onIonChange={() => {}}
                  />
                  <Text size="xs">
                    {outline.id} - {outline.theme}
                  </Text>
                </Item>
              ))}
              {filtered.length === 0 && (
                <Item>
                  <Text color="medium">No outlines found</Text>
                </Item>
              )}
            </List>
          </IonAccordion>
        </IonAccordionGroup>
      </List>
    </>
  );
};
