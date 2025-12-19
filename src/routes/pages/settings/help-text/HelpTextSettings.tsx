import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonButton,
  IonText,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { useHelpTextStore } from "@services/app/help-text/useHelpTextStore";
import { Space } from "@layout/space/Space";

export const HelpTextSettings: React.FC = () => {
  const { isGloballyDisabled, toggleGlobalDisable, reEnableGroup } =
    useHelpTextStore();

  const helpTextGroups = [
    {
      id: "talks",
      title: "Talks",
      description: "Reset all help text for the talks feature",
    },
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton defaultHref="/settings" text="Settings" />
          </IonButtons>
          <IonTitle>Help Text Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Help Text Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Space height="2" />

        <IonList>
          <IonItem>
            <IonLabel>
              <h2>Disable All Help Text</h2>
              <p>Turn off all contextual help throughout the app</p>
            </IonLabel>
            <IonToggle
              checked={isGloballyDisabled}
              onIonChange={toggleGlobalDisable}
              slot="end"
            />
          </IonItem>
        </IonList>

        <Space height="2" />

        <IonList>
          <IonItem lines="none">
            <IonLabel>
              <h3>Re-enable Help Text by Feature</h3>
              <IonText color="medium">
                <p>Show previously dismissed help text for specific features</p>
              </IonText>
            </IonLabel>
          </IonItem>

          {helpTextGroups.map((group) => (
            <IonItem key={group.id}>
              <IonLabel>
                <h2>{group.title}</h2>
                <p>{group.description}</p>
              </IonLabel>
              <IonButton
                slot="end"
                fill="outline"
                onClick={() => reEnableGroup(group.id)}
              >
                Re-enable
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
