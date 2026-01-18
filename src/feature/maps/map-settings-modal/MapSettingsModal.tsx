import settingsIcon from "@icons/settings.svg";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { Icon } from "@ionic-display/icon/Icon";
import { Label } from "@ionic-display/label/Label";
import { Button } from "@ionic-input/button/Button";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { MapStyleSelect } from "@services/vendor/mapbox/components/map-style-select/MapStyleSelect";
import { useState } from "react";

export const MapSettingsModal: React.FC<{ id?: string }> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Icon src={settingsIcon} slot="icon-only" />
      </Button>
      <IonModal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Map Settings</IonTitle>
            <IonButtons slot="end">
              <CloseButton onClick={() => setIsOpen(false)} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <List inset>
            <Item>
              <MapStyleSelect id={id}>
                <Label slot="label">Map Style</Label>
              </MapStyleSelect>
            </Item>
          </List>
        </IonContent>
      </IonModal>
    </>
  );
};
