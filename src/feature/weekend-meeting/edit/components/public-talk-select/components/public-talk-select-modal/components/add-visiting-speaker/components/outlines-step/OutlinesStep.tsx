import { useState } from "react";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { Button } from "@ionic-input/button/Button";
import { Checkbox } from "@ionic-input/checkbox/Checkbox";
import { IonListHeader } from "@ionic/react";
import { Label } from "@ionic-display/label/Label";
import { useLiveQuery } from "@tanstack/react-db";
import { outlineCollection } from "@tanstack-db/outline/outlineCollection";
import { useAddVisitingSpeakerStore } from "../../store/useAddVisitingSpeakerStore";

export const OutlinesStep: React.FC = () => {
  const firstName = useAddVisitingSpeakerStore((s) => s.firstName);
  const lastName = useAddVisitingSpeakerStore((s) => s.lastName);
  const selectedOutlineIds = useAddVisitingSpeakerStore((s) => s.selectedOutlineIds);
  const toggleOutline = useAddVisitingSpeakerStore((s) => s.toggleOutline);
  const submitOutlines = useAddVisitingSpeakerStore((s) => s.submitOutlines);

  const [searchQuery, setSearchQuery] = useState("");

  const { data: outlines = [] } = useLiveQuery((q) =>
    q.from({ o: outlineCollection }).select(({ o }) => ({
      id: o.id,
      theme: o.theme,
    })),
  );

  const filtered = outlines.filter((o) =>
    o.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.id.includes(searchQuery),
  );

  return (
    <>
      <List inset>
        <IonListHeader>
          <Label color="medium">
            Outlines for {firstName} {lastName}
          </Label>
        </IonListHeader>
      </List>

      <Searchbar
        value={searchQuery}
        onIonInput={(e) => setSearchQuery(e.detail.value ?? "")}
        placeholder="Search outlines..."
        debounce={300}
      />

      <List inset>
        {filtered.map((outline) => (
          <Item key={outline.id} onClick={() => toggleOutline(outline.id)}>
            <Checkbox
              slot="start"
              checked={selectedOutlineIds.includes(outline.id)}
              onIonChange={() => {}}
            />
            <Text>
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

      <Button onClick={submitOutlines}>
        Save Outlines ({selectedOutlineIds.length} outline{selectedOutlineIds.length !== 1 ? "s" : ""})
      </Button>
    </>
  );
};
