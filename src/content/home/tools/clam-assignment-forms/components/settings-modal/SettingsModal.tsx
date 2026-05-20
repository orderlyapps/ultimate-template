import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { useClamAssignmentFormsStore } from "../../store/useClamAssignmentFormsStore";

type Props = {
  isOpen: boolean;
  onDismiss: () => void;
};

/**
 * Settings modal for CLAM Assignment Forms.
 * Allows users to configure the default number of weeks ahead.
 */
export function SettingsModal({ isOpen, onDismiss }: Props) {
  const defaultWeeksAhead = useClamAssignmentFormsStore(
    (s) => s.defaultWeeksAhead,
  );
  const setDefaultWeeksAhead = useClamAssignmentFormsStore(
    (s) => s.setDefaultWeeksAhead,
  );

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={onDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Space height="1" />
        <IonItem lines="none">
          <IonLabel>
            <Text bold size="lg">
              Default Weeks Ahead
            </Text>
            <br />
            <Text color="medium" size="sm">
              Number of weeks ahead to show when navigating to CLAM Assignment
              Forms.
            </Text>
          </IonLabel>
        </IonItem>

        <Space height="2" />

        <IonItem lines="none">
          <IonLabel className="ion-text-center">
            <IonButton
              fill="clear"
              onClick={() =>
                setDefaultWeeksAhead(Math.max(0, defaultWeeksAhead - 1))
              }
              className="ion-margin-end"
            >
              <Text bold size="xxxl">
                -
              </Text>
            </IonButton>

            <IonButton fill="clear"
              className="ion-margin-horizontal">
              <Text bold size="xxxl">
                {defaultWeeksAhead}
              </Text>
            </IonButton>

            <IonButton
              fill="clear"
              onClick={() =>
                setDefaultWeeksAhead(Math.min(52, defaultWeeksAhead + 1))
              }
              className="ion-margin-start"
            >
              <Text bold size="xxxl">
                +
              </Text>
            </IonButton>
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonModal>
  );
}
