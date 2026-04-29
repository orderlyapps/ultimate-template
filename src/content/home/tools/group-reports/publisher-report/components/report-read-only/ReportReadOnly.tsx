import { IonItem, IonLabel } from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { Text } from "@ionic-display/text/Text";
import type { Report } from "@tanstack-db/report/reportSchema";
import { Item } from "@ionic-layout/item/Item";

type Props = {
  report: Report | undefined;
};

/**
 * Read-only view of a publisher's report for users with can_read but not can_edit.
 */
export const ReportReadOnly: React.FC<Props> = ({ report }) => (
  <>
    {!report ? (
      <Item lines='none'>
        <Text color="medium">No report submitted for this month.</Text>
      </Item>
    ) : (
      <List>
        <IonItem lines="full">
          <IonLabel>Participated in ministry</IonLabel>
          <Text slot="end">{report.active ? "Yes" : "No"}</Text>
        </IonItem>
        {report.active && (
          <>
            <IonItem lines="full">
              <IonLabel>Hours</IonLabel>
              <Text slot="end">{report.hours ?? "—"}</Text>
            </IonItem>
            <IonItem lines="full">
              <IonLabel>Bible Studies</IonLabel>
              <Text slot="end">{report.bible_studies ?? "—"}</Text>
            </IonItem>
            {report.comments && (
              <IonItem lines="full">
                <IonLabel>Comments</IonLabel>
                <Text slot="end">{report.comments}</Text>
              </IonItem>
            )}
          </>
        )}
      </List>
    )}
  </>
);
