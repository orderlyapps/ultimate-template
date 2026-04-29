import { IonAccordion, IonLabel, IonNote } from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { formatPublisherName } from "@format/formatPublisherName";
import { usePublishersByGroup } from "../../hooks/usePublishersByGroup";
import type { Group } from "@tanstack-db/group/groupSchema";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { Space } from "@layout/space/Space";
import { GroupReportPdfDownloadButton } from "./components/group-report-pdf-download-button/GroupReportPdfDownloadButton";

type Props = {
  /** The group whose publishers to display */
  group: Group;
  /** First day of previous month as "yyyy-mm-dd" */
  reportDate: string;
};

/**
 * Accordion item for a single group showing its publishers as tappable report entries.
 */
export const GroupPublisherAccordion: React.FC<Props> = ({
  group,
  reportDate,
}) => {
  const { data: publishers } = usePublishersByGroup(group.id);
  const count = publishers?.length ?? 0;

  /** Format reportDate as human-readable month label, e.g. "March 2025" */
  const monthLabel = new Date(reportDate + "T00:00:00").toLocaleDateString(
    undefined,
    { month: "long", year: "numeric" },
  );

  return (
    <IonAccordion value={group.id}>
      <ItemAccordionHeader>
        <IonLabel>
          <SectionHeading>{group.name}</SectionHeading>
        </IonLabel>
        <IonNote slot="end" className="ion-padding-end">
          {count}
        </IonNote>
      </ItemAccordionHeader>
      <List slot="content">
        {count > 0 && (
          <GroupReportPdfDownloadButton
            groupName={group.name}
            monthLabel={monthLabel}
            reportDate={reportDate}
            publishers={publishers!}
          />
        )}
        {count === 0 ? (
          <Item lines="none">
            <IonLabel>
              <Text color="medium">No publishers in this group</Text>
            </IonLabel>
          </Item>
        ) : (
          publishers!.map((publisher) => (
            <Item
              key={publisher.id}
              detail
              button
              routerLink={`/home/group-reports/${publisher.id}?date=${reportDate}`}
            >
              <IonLabel>
                <Text>{formatPublisherName(publisher)}</Text>
              </IonLabel>
            </Item>
          ))
        )}
        <Space />
      </List>
    </IonAccordion>
  );
};
