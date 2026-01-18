import { IonAlert } from "@ionic/react";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { openInMapApp } from "@services/vendor/mapbox/helper/openInMapApp";

export const MapLocationAlert: React.FC = () => {
  const inlineAlert = useDoorToDoorStore((state) => state.inlineAlert);
  const setInlineAlert = useDoorToDoorStore((state) => state.setInlineAlert);

  return (
    <IonAlert
      isOpen={!!inlineAlert}
      onDidDismiss={() => setInlineAlert(null)}
      header="Get Directions"
      message={inlineAlert ? `Open this location in your map app?` : ""}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Open",
          handler: () => {
            if (inlineAlert) {
              openInMapApp(inlineAlert);
            }
          },
        },
      ]}
    />
  );
};
