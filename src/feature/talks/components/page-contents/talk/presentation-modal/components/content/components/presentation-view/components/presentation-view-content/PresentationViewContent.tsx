import { IonCard, IonList } from "@ionic/react";
import { RTFEditor } from "@services/vendor/tiptap/editor/RTFEditor";
import { useTalksStore } from "@feature/talks/state/useTalksStore";

type Props = {
  sectionName: string;
  subsectionName: string;
  content: string | Record<string, unknown>;
};

export function PresentationViewContent({ content }: Props) {
  const presentationTextSize = useTalksStore(
    (state) => state.presentationTextSize
  );

  const safeContent = (() => {
    if (typeof content === "string") {
      return content.trim().length ? content : "No content";
    }
    return content;
  })();

  return (
    <IonList lines="none">
      <IonCard className="ion-margin">
        <RTFEditor
          content={safeContent}
          canEdit={false}
          fontSize={presentationTextSize}
        />
      </IonCard>
    </IonList>
  );
}
