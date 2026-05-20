import { List } from "@ionic-layout/list/List";
import { IonItem, IonLabel } from "@ionic/react";
import { FeatureGuard } from "@services/app/features/FeatureGuard";
import { PermissionGuard } from "@services/app/auth/permissions/PermissionGuard";
import { AuthGuard } from "@services/app/auth/AuthGuard";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";

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
            <Space height="0.5" />
            <Text bold>Talks</Text>
            <Space height="0.5" />
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
            <Space height="0.5" />
            <Text bold>Map Print</Text>
            <Space height="0.5" />
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
            <Space height="0.5" />
            <Text bold>Groups</Text>
            <Space height="0.5" />
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
            <Space height="0.5" />
            <Text bold>Group Reports</Text>
            <Space height="0.5" />
          </IonLabel>
        </IonItem>
      </PermissionGuard>

      <PermissionGuard permission="edit:clean">
        <IonItem
          lines="none"
          routerLink="/home/tools/clean-tables"
          className="ion-text-right"
          slot="end"
        >
          <IonLabel>
            <Space height="0.5" />
            <Text bold>Cleaning Assignments</Text>
            <Space height="0.5" />
          </IonLabel>
        </IonItem>
      </PermissionGuard>

      <IonItem
        lines="none"
        routerLink="/home/tools/reminders"
        className="ion-text-right"
        slot="end"
      >
        <IonLabel>
          <Space height="0.5" />
          <Text bold>Reminders</Text>
          <Space height="0.5" />
        </IonLabel>
      </IonItem>

      <AuthGuard>
        <IonItem
          className="ion-text-right ion-padding-bottom ion-margin-bottom"
          routerLink="/home/tools/schedule-pdfs"
          slot="end"
        >
          <IonLabel>
            <Space height="0.5" />
            <Text bold>Schedule PDF's</Text>
            <Space height="0.5" />
          </IonLabel>
        </IonItem>
      </AuthGuard>

      <Space height="2" />
    </List>
  );
}
