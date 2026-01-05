import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { useParams } from "react-router-dom";
import { Space } from "@layout/space/Space";
import { SectionsList } from "../../../../../feature/talks/components/page-contents/talk/sections-list/SectionsList";
import { EditableCondensedHeader } from "@feature/talks/components/edit-header/EditHeader";
import { TalkPageHeaderButtons } from "../../../../../feature/talks/components/page-contents/talk/talk-page-header-buttons/TalkPageHeaderButtons";

export const Talk: React.FC = () => {
  const { talkId } = useParams<{ talkId: string }>();
  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));
  const updateTalkName = useTalksStore((s) => s.updateTalkName);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/talks" text="Talks" />
          </IonButtons>

          <TalkPageHeaderButtons />

          <IonTitle>{talk?.name ?? "Talk"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <EditableCondensedHeader
              value={talk?.name ?? "Talk"}
              header="Rename Talk"
              placeholder="Talk name"
              onSave={(nextValue) => {
                if (!talkId) return;
                updateTalkName(talkId, nextValue);
              }}
            />
          </IonToolbar>
        </IonHeader>

        <Space height="2" />

        <SectionsList />
      </IonContent>
    </IonPage>
  );
};
