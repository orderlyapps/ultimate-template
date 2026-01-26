import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonButtons,
  IonLabel,
} from "@ionic/react";
import { useDoorToDoorStore } from "@feature/maps/door-to-door/store/useDoorToDoorStore";
import { formatDistanceToNow } from "date-fns";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";

export const DoNotCallUnitModal: React.FC = () => {
  const selectedDoNotCallUnits = useDoorToDoorStore(
    (state) => state.selectedDoNotCallUnits,
  );
  const setSelectedDoNotCallUnits = useDoorToDoorStore(
    (state) => state.setSelectedDoNotCallUnits,
  );

  const isOpen = !!selectedDoNotCallUnits && selectedDoNotCallUnits.length > 0;

  const handleDismiss = () => {
    setSelectedDoNotCallUnits(null);
  };

  if (!selectedDoNotCallUnits || selectedDoNotCallUnits.length === 0)
    return null;

  const firstUnit = selectedDoNotCallUnits[0];
  const address = `${firstUnit.house_number} ${firstUnit.street}, ${firstUnit.suburb}`;

  return (
    <IonModal isOpen={isOpen} onDidDismiss={handleDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{address}</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={handleDismiss} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {selectedDoNotCallUnits.map((unit) => {
            const created = unit.created_at
              ? formatDistanceToNow(new Date(unit.created_at), {
                  addSuffix: true,
                })
              : "Unknown";

            return (
              <Item key={unit.id}>
                <IonLabel>
                  <Grid>
                    <Row>
                      <Col>
                        <Text bold>Unit {unit.unit_number}</Text>
                      </Col>
                      <Col>
                        <Text color="medium" size="sm">
                          Added {created}
                        </Text>
                      </Col>
                    </Row>
                  </Grid>

                  <Row>
                    <Col>
                      <Text>{unit.notes || "No notes available"}</Text>
                    </Col>
                  </Row>
                </IonLabel>
              </Item>
            );
          })}
        </IonList>
      </IonContent>
    </IonModal>
  );
};
