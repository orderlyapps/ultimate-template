import { IonItem, IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { AssignmentSelect } from "../assignment-select/AssignmentSelect";
import type { WeekOption } from "../../hooks/use-weeks";
import { Grid } from "@ionic-layout/grid/Grid";
import { Col } from "@ionic-layout/col/Col";
import { Row } from "@ionic-layout/row/Row";

interface WeekAssignmentItemProps {
  week: WeekOption;
  majorGroupId: string | null;
  minorGroupId: string | null;
  userGroups: Array<{ id: string; name: string }>;
  canEdit: boolean;
  onMajorChange: (weekId: string, groupId: string) => void;
  onMinorChange: (weekId: string, groupId: string) => void;
  onDeleteMajor: (weekId: string) => void;
  onDeleteMinor: (weekId: string) => void;
}

/**
 * Displays a single week with select inputs for major and minor cleaning assignments.
 */
export const WeekAssignmentItem: React.FC<WeekAssignmentItemProps> = ({
  week,
  majorGroupId,
  minorGroupId,
  userGroups,
  canEdit,
  onMajorChange,
  onMinorChange,
  onDeleteMajor,
  onDeleteMinor,
}) => {
  return (
    <IonItem lines="full">
      <IonLabel>
        <Text bold>{week.label}</Text>

        <Grid>
          <Row>
            <Col>
              <AssignmentSelect
                label="Light"
                value={minorGroupId ?? ""}
                groups={userGroups}
                canEdit={canEdit}
                onChange={(groupId) => onMinorChange(week.id, groupId)}
                onDelete={() => onDeleteMinor(week.id)}
              />
            </Col>

            <Col>
              <AssignmentSelect
                label="Thorough"
                value={majorGroupId ?? ""}
                groups={userGroups}
                canEdit={canEdit}
                onChange={(groupId) => onMajorChange(week.id, groupId)}
                onDelete={() => onDeleteMajor(week.id)}
              />
            </Col>
          </Row>
        </Grid>
      </IonLabel>
    </IonItem>
  );
};
