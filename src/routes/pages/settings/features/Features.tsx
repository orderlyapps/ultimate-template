import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Label } from "@ionic-display/label/Label";
import { Toggle } from "@ionic-input/toggle/Toggle";
import { Space } from "@layout/space/Space";
import {
  appFeatures,
  featureGroups,
  isFeatureEnabled,
  isGroupEnabled,
} from "@services/app/features/app-features";
import { useAppFeaturesStore } from "@services/app/features/useAppFeaturesStore";

export const Features: React.FC = () => {
  const featureOverrides = useAppFeaturesStore((s) => s.featureOverrides);
  const groupOverrides = useAppFeaturesStore((s) => s.groupOverrides);
  const setFeatureEnabled = useAppFeaturesStore((s) => s.setFeatureEnabled);
  const setGroupEnabled = useAppFeaturesStore((s) => s.setGroupEnabled);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/settings" text="Settings" />
          </IonButtons>
          <IonTitle>Features</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Features</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />
        <List>
          {featureGroups.length > 0 ? (
            <>
              {featureGroups.map((group) => {
                const groupEnabled = isGroupEnabled(group.id, groupOverrides);

                return (
                  <Item key={group.id}>
                    <Label>{group.label}</Label>
                    <Toggle
                      slot="end"
                      checked={groupEnabled}
                      onIonChange={(e) =>
                        setGroupEnabled(group.id, e.detail.checked)
                      }
                    />
                  </Item>
                );
              })}
              <Space height="2" />
            </>
          ) : null}

          {appFeatures.map((feature) => {
            const enabled = isFeatureEnabled({
              featureId: feature.id,
              featureOverrides,
              groupOverrides,
            });

            return (
              <Item key={feature.id}>
                <Label>{feature.label}</Label>
                <Toggle
                  slot="end"
                  checked={enabled}
                  onIonChange={(e) =>
                    setFeatureEnabled(feature.id, e.detail.checked)
                  }
                />
              </Item>
            );
          })}
        </List>
      </IonContent>
    </IonPage>
  );
};
