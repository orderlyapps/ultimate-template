import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { PublisherListsContent } from "@/content/publishers/lists/PublisherListsContent";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { usePublisherListsStore } from "@/content/publishers/lists/store/usePublisherListsStore";
import { PublisherListsHeaderButtons } from "@/content/publishers/lists/components/publisher-lists-header-buttons/PublisherListsHeaderButtons";

export const PublisherLists: React.FC = () => {
  const { activePresetName, searchQuery, setSearchQuery } =
    usePublisherListsStore();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/publishers" text="Publishers" />
          </IonButtons>
          <IonButtons slot="end">
            <PublisherListsHeaderButtons />
          </IonButtons>
          <IonTitle>{activePresetName}</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <Searchbar
            value={searchQuery}
            onIonInput={(e) => setSearchQuery(e.detail.value ?? "")}
            placeholder="Search publishers..."
            debounce={300}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{activePresetName}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <PublisherListsContent />
      </IonContent>
    </IonPage>
  );
};
