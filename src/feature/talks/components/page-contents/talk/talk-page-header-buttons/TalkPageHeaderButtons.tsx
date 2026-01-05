import { IonButtons } from "@ionic/react";
import { FileExport } from "@input/file-export/FileExport";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { useParams } from "react-router-dom";
import { TalkPageAddSectionButton } from "./components/talk-page-add-section-button/TalkPageAddSectionButton";
import { TalkPagePresentationButton } from "./components/talk-page-presentation-button/TalkPagePresentationButton";

export const TalkPageHeaderButtons: React.FC = () => {
  const { talkId } = useParams<{ talkId: string }>();
  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));

  return (
    <IonButtons slot="end">
      {talk && (
        <FileExport
          getData={() => JSON.stringify(talk, null, 2)}
          filename={`${talk.name}.talk.ord`}
          iconOnly
        />
      )}
      <TalkPagePresentationButton />
      <TalkPageAddSectionButton />
    </IonButtons>
  );
};
