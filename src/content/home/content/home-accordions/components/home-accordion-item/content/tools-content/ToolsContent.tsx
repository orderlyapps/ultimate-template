import { List } from "@ionic-layout/list/List";
import { IonItem, IonLabel } from "@ionic/react";
import { FeatureGuard } from "@services/app/features/FeatureGuard";
import { PermissionGuard } from "@services/app/auth/permissions/PermissionGuard";
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

      <PermissionGuard permission="read:report">
        <IonItem
          lines="none"
          routerLink="/home/group-reports"
          className="ion-text-right"
          slot="end"
        >
          <IonLabel>
            <Text bold>Group Reports</Text>
          </IonLabel>
        </IonItem>
      </PermissionGuard>

      <FeatureGuard id="schedule-pdfs">
        <IonItem
          className="ion-text-right ion-padding-bottom ion-margin-bottom"
          routerLink="/home/tools/schedule-pdfs"
          slot="end"
        >
          <IonLabel>
            <Text bold>Schedule PDF's</Text>
          </IonLabel>
        </IonItem>
      </FeatureGuard>
    </List>
  );
}
