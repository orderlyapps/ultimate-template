// import { Textarea } from "@ionic-input/textarea/Textarea";
import { Space } from "@layout/space/Space";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { IonCardContent, IonLabel } from "@ionic/react";
import type { Subsection } from "@feature/talks/state/useTalksStore";
import { Card } from "@ionic-display/card/Card";
import { Item } from "@ionic-layout/item/Item";
import { TimeAllocationStepper } from "@feature/talks/components/page-contents/subsection/time-allocation-stepper/TimeAllocationStepper";
import { SubsectionDetailsHelp } from "./components/SubsectionDetailsHelp";
import { SimpleEditor } from "@tiptap-ui/components/tiptap-templates/editor/RTFEditor";
import { useCallback } from "react";
import { Editor } from "@tiptap/core";

type Props = {
  talkId: string;
  sectionId: string;
  subsection: Subsection;
};

export function SubsectionDetails({ talkId, sectionId, subsection }: Props) {
  const updateSubsection = useTalksStore((s) => s.updateSubsection);

  const handleEditorUpdate = useCallback(
    (editor: Editor) => {
      updateSubsection(talkId, sectionId, subsection.id, {
        content: editor.getHTML(),
      });
    },
    [talkId, sectionId, subsection.id, updateSubsection]
  );

  return (
    <>
      <SubsectionDetailsHelp />
      <Space height="2" />
      <Item lines="none">
        <IonLabel>
          <TimeAllocationStepper
            valueSeconds={subsection.timeAllocation}
            onChange={(nextSeconds) => {
              updateSubsection(talkId, sectionId, subsection.id, {
                timeAllocation: nextSeconds,
              });
            }}
          />
        </IonLabel>
      </Item>

      <Card>
        <IonCardContent>
          <SimpleEditor
            initialContent={subsection.content}
            onUpdate={handleEditorUpdate}
          />
        </IonCardContent>
      </Card>
    </>
  );
}
