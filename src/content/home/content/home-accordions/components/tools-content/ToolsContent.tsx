import { List } from "@ionic-layout/list/List";
import { IonItem, IonLabel } from "@ionic/react";
import { FeatureGuard } from "@services/app/features/FeatureGuard";
import { Text } from "@ionic-display/text/Text";

export function ToolsContent() {
  return (
    <List>
      <FeatureGuard id="talks">
        <IonItem
          lines="none"
          routerLink="/home/talks"
          className="ion-text-right"
          slot="end"
        >
          <IonLabel>
            <Text bold>Talks</Text>
          </IonLabel>
        </IonItem>
      </FeatureGuard>
      <FeatureGuard id="mapPrint">
        <IonItem
          lines="none"
          routerLink="/home/map-print"
          className="ion-text-right"
          slot="end"
        >
          <IonLabel>
            <Text bold>Map Print</Text>
          </IonLabel>
        </IonItem>
      </FeatureGuard>
      <FeatureGuard id="groups">
        <IonItem
          lines="none"
          routerLink="/home/groups"
          className="ion-text-right"
          slot="end"
        >
          <IonLabel>
            <Text bold>Groups</Text>
          </IonLabel>
        </IonItem>
      </FeatureGuard>
      <IonItem
        // lines="none"
        routerLink="/home/tools/schedule-pdfs"
        className="ion-text-right"
        slot="end"
      >
        <IonLabel>
          <Text bold>Schedule PDFs</Text>
        </IonLabel>
      </IonItem>
    </List>
  );
}
