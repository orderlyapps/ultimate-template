import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { funnel } from "ionicons/icons";
import { AddButton } from "@input/button/add-button/AddButton";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { AllPublishersList } from "@feature/db/publisher/all-publishers-list/AllPublishersList";
import { AddPublisherModal } from "@feature/db/publisher/all-publishers-list/components/add-publisher-modal/AddPublisherModal";
import { PublisherFilterModal } from "@feature/db/publisher/all-publishers-list/components/publisher-filter-modal/PublisherFilterModal";
import { useLocalStorage } from "@util/hooks/useLocalStorage";
import { defaultFilters } from "@feature/db/publisher/all-publishers-list/publisherFilterState";
import type { PublisherFilterState } from "@feature/db/publisher/all-publishers-list/publisherFilterState";
import { Space } from "@layout/space/Space";

export const AllPublishers: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [storedFilters, setFilters] = useLocalStorage<PublisherFilterState>(
    "publisher-list-filters",
    defaultFilters
  );

  const filters: PublisherFilterState = {
    ...defaultFilters,
    ...storedFilters,
  };

  const hasActiveFilters =
    filters.standing.length > 0 ||
    filters.type.length > 0 ||
    filters.gender.length > 0 ||
    filters.group.length > 0;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/publishers" text="Publishers" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsFilterModalOpen(true)}>
              <IonIcon
                icon={funnel}
                slot="icon-only"
                color={hasActiveFilters ? "primary" : undefined}
              />
            </IonButton>
            <AddButton onClick={() => setIsAddModalOpen(true)} />
          </IonButtons>
          <IonTitle>All Publishers</IonTitle>
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
            <IonTitle size="large">All Publishers</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <AllPublishersList filters={filters} searchQuery={searchQuery} />
        <AddPublisherModal
          isOpen={isAddModalOpen}
          onDismiss={() => setIsAddModalOpen(false)}
        />
        <PublisherFilterModal
          isOpen={isFilterModalOpen}
          onDismiss={() => setIsFilterModalOpen(false)}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </IonContent>
    </IonPage>
  );
};
