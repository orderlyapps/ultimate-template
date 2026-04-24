import { useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
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
import {
  useFeatureAccess,
  TEMP_ALL_AUTHORIZED_NAMES,
  GROUP_REPORTS_ACCESS,
} from "@services/app/auth/temp-feature-access/useFeatureAccess";
import { Button } from "@ionic-input/button/Button";

export const Features: React.FC = () => {
  const featureOverrides = useAppFeaturesStore((s) => s.featureOverrides);
  const groupOverrides = useAppFeaturesStore((s) => s.groupOverrides);
  const setFeatureEnabled = useAppFeaturesStore((s) => s.setFeatureEnabled);
  const setGroupEnabled = useAppFeaturesStore((s) => s.setGroupEnabled);

  // TEMPORARY: Feature access control - remove when auth is implemented
  const { isUserAllowed, isUnlocked, validatePassword } = useFeatureAccess(
    TEMP_ALL_AUTHORIZED_NAMES,
  );

  const { isUserAllowed: damianUnlocked } = useFeatureAccess(["damian"]);
  const { isUserAllowed: isGroupReportsAllowed } =
    useFeatureAccess(GROUP_REPORTS_ACCESS);

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUnlock = () => {
    if (validatePassword(password)) {
      setPassword("");
      setError("");
    } else {
      setError("Invalid password");
    }
  };

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

        {/* TEMPORARY: Password unlock section - remove when auth is implemented */}
        {isUserAllowed && !isUnlocked && (
          <List>
            <Item>
              <Label position="stacked">
                Enter Password to Unlock Features
              </Label>
              <IonInput
                type="password"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value ?? "")}
                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                placeholder="Password"
              />
              {error && (
                <p
                  style={{ color: "var(--ion-color-danger)", margin: "4px 0" }}
                >
                  {error}
                </p>
              )}
            </Item>
            <Button onClick={handleUnlock} fill="clear">
              Unlock
            </Button>
            <Space height="2" />
          </List>
        )}

        {isUserAllowed && isUnlocked && (
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

            {appFeatures
              .filter(({ id }) => {
                if (id === "groups") return damianUnlocked;
                if (id === "mapPrint") return damianUnlocked;
                if (id === "schedule-pdfs") return damianUnlocked;
                if (id === "talks") return damianUnlocked;
                if (id === "groupReports") return isGroupReportsAllowed;
                return true;
              })
              .map((feature) => {
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
        )}
      </IonContent>
    </IonPage>
  );
};
