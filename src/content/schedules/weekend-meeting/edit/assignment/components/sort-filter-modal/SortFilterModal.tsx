import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { usePublisherSortFilterStore } from "../../store/usePublisherSortFilterStore";
import { PresetList } from "./components/preset-list/PresetList";
import { SortConfig } from "./components/sort-config/SortConfig";
import { SaveAsPresetButton } from "./components/save-as-preset-button/SaveAsPresetButton";
import { FilterConfig } from "@/content/schedules/weekend-meeting/edit/assignment/components/sort-filter-modal/components/filter-config/FilterConfig";
import { OptionConfig } from "@/content/schedules/weekend-meeting/edit/assignment/components/sort-filter-modal/components/option-config/OptionConfig";

export const SortFilterModal: React.FC = () => {
  const isOpen = usePublisherSortFilterStore((s) => s.isModalOpen);
  const closeModal = usePublisherSortFilterStore((s) => s.closeModal);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={closeModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sort & Filter</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={closeModal} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <PresetList />
        <SortConfig />
        <FilterConfig />
        <OptionConfig />
        <SaveAsPresetButton />
      </IonContent>
    </IonModal>
  );
};
