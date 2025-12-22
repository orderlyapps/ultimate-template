// import { Textarea } from "@ionic-input/textarea/Textarea";
import { Space } from "@layout/space/Space";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { IonCardContent, IonLabel } from "@ionic/react";
import type { Subsection } from "@feature/talks/state/useTalksStore";
import { Card } from "@ionic-display/card/Card";
import { Item } from "@ionic-layout/item/Item";
import { TimeAllocationStepper } from "@feature/talks/components/page-contents/subsection/time-allocation-stepper/TimeAllocationStepper";
import { SubsectionDetailsHelp } from "./components/SubsectionDetailsHelp";
import { useCallback, useState } from "react";
import { Editor } from "@tiptap/core";
import { RTFModalEditor } from "@services/vendor/tiptap/modal-editor/RTFModalEditor";
import { RTFEditor } from "@services/vendor/tiptap/editor/RTFEditor";

type Props = {
  talkId: string;
  sectionId: string;
  subsection: Subsection;
};

export function SubsectionDetails({ talkId, sectionId, subsection }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const updateSubsection = useTalksStore((s) => s.updateSubsection);
  const currentSubsection = useTalksStore((s) =>
    s.talks
      .find((t) => t.id === talkId)
      ?.sections.find((sec) => sec.id === sectionId)
      ?.subsections.find((sub) => sub.id === subsection.id)
  );

  const handleEditorUpdate = useCallback(
    (editor: Editor) => {
      updateSubsection(talkId, sectionId, subsection.id, {
        content: editor.getJSON(),
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

      <Card onClick={() => setIsOpen(true)}>
        <IonCardContent>
          <RTFEditor
            content={currentSubsection?.content || subsection.content}
            canEdit={false}
          />
        </IonCardContent>
      </Card>

      <RTFModalEditor
        onUpdate={handleEditorUpdate}
        initialContent={subsection.content}
        title={subsection.name}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
