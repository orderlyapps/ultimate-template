// import { Icon } from "@ionic-display/icon/Icon";
// import { Button } from "@ionic-input/button/Button";
// import mapIcon from "@icons/map.svg";
// import {
//   IonButtons,
//   IonHeader,
//   IonModal,
//   IonTitle,
//   IonToolbar,
// } from "@ionic/react";
// import { useState } from "react";
// import { CloseButton } from "@input/button/close-button/CloseButton";

// export const MapListModal: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setIsOpen(true)}>
//         <Icon src={mapIcon} slot="icon-only" />
//       </Button>
//       <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
//         <IonHeader>
//           <IonToolbar>
//             <IonTitle>Map List</IonTitle>
//             <IonButtons slot="end">
//               <CloseButton onClick={() => setIsOpen(false)} />
//             </IonButtons>
//           </IonToolbar>
//         </IonHeader>
//       </IonModal>
//     </>
//   );
// };

import { Icon } from "@ionic-display/icon/Icon";
import { Button } from "@ionic-input/button/Button";
import mapIcon from "@icons/map.svg";
import {
  IonButtons,
  IonHeader,
  IonContent,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { MapList } from "@feature/maps/door-to-door/components/map-list-modal/components/map-list/MapList";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { SelectedMap } from "@feature/maps/door-to-door/components/map-list-modal/components/selected-map/SelectedMap";
import { RecentMaps } from "@feature/maps/door-to-door/components/map-list-modal/components/recent-maps/RecentMaps";

export const MapListModal: React.FC = () => {
  const isOpen = useDoorToDoorStore((state) => state.isMapListModalOpen);
  const openModal = useDoorToDoorStore((state) => state.openMapListModal);
  const closeModal = useDoorToDoorStore((state) => state.closeMapListModal);

  return (
    <>
      <Button onClick={openModal}>
        <Icon src={mapIcon} slot="icon-only" />
      </Button>
      <IonModal isOpen={isOpen} onDidDismiss={closeModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Map List</IonTitle>
            <IonButtons slot="end">
              <CloseButton onClick={closeModal} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <SelectedMap />
          <RecentMaps />
          <MapList />
        </IonContent>
      </IonModal>
    </>
  );
};
