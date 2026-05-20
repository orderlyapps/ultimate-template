import { Fragment } from "react";
import { Item } from "@ionic-layout/item/Item";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";
import { formatPublisherName } from "@format/formatPublisherName";
import type { MidweekMeetingData } from "@tanstack-db/midweek_meeting_data/midweekMeetingDataSchema";
import type { useClamAssignmentFormsData } from "../../hooks/useClamAssignmentFormsData";

type ParticipantFn = ReturnType<typeof useClamAssignmentFormsData>["participant"];

type Item = {
  label: string | null | undefined;
  color: string;
  participant: ReturnType<ParticipantFn>;
};

type Props = {
  meeting: MidweekMeetingData;
  /** Look up a participant by assignment_id */
  participant: ParticipantFn;
  hasSecondSchool: boolean;
};

function PartItem({ label, color, participant: p }: Item) {
  return (
    <Item lines="none">
      <Grid className="ion-text-nowrap ion-no-padding">
        <Row>
          <Col>
            <Text bold color={color}>
              {label}
            </Text>
          </Col>
        </Row>
        <Row className="ion-padding-start ion-margin-start ion-padding-bottom">
          <Col>
            {p && (
              <Text>
                {formatPublisherName(
                  p as Parameters<typeof formatPublisherName>[0],
                  "display last",
                )}
              </Text>
            )}
          </Col>
        </Row>
      </Grid>
    </Item>
  );
}

/**
 * Renders the student parts list (bible reading + AYF) for Main Hall and
 * optionally Second School, without assistant names.
 */
export function StudentPartsList({ meeting, participant, hasSecondSchool }: Props) {
  const mainHallItems: Item[] = [
    { label: meeting.mwb_tgw_bread_title, color: "jw_slate", participant: participant("school_1_bible_reading") },
    { label: meeting.mwb_ayf_part1_title, color: "jw_brown", participant: participant("school_1_apply_1") },
    { label: meeting.mwb_ayf_part2_title, color: "jw_brown", participant: participant("school_1_apply_2") },
    { label: meeting.mwb_ayf_part3_title, color: "jw_brown", participant: participant("school_1_apply_3") },
    { label: meeting.mwb_ayf_part4_title, color: "jw_brown", participant: participant("school_1_apply_4") },
  ];

  const secondSchoolItems: Item[] = [
    { label: meeting.mwb_tgw_bread_title, color: "jw_slate", participant: participant("school_2_bible_reading") },
    { label: meeting.mwb_ayf_part1_title, color: "jw_brown", participant: participant("school_2_apply_1") },
    { label: meeting.mwb_ayf_part2_title, color: "jw_brown", participant: participant("school_2_apply_2") },
    { label: meeting.mwb_ayf_part3_title, color: "jw_brown", participant: participant("school_2_apply_3") },
    { label: meeting.mwb_ayf_part4_title, color: "jw_brown", participant: participant("school_2_apply_4") },
  ];

  return (
    <div className="ion-padding">
      <Space height="1.5" />

      {hasSecondSchool && (
        <Item lines="none">
          <Text bold size="xl">Main Hall</Text>
        </Item>
      )}

      {mainHallItems.map((item, i) =>
        item.label ? <Fragment key={i}><PartItem {...item} label={item.label} /></Fragment> : null,
      )}

      {hasSecondSchool && (
        <>
          <Space height="1.5" />
          <Item lines="none">
            <Text bold size="xl">Second School</Text>
          </Item>
          {secondSchoolItems.map((item, i) =>
            item.label ? <Fragment key={i}><PartItem {...item} label={item.label} /></Fragment> : null,
          )}
        </>
      )}
    </div>
  );
}
