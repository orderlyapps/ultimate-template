import { Fragment } from "react";
import { Item } from "@ionic-layout/item/Item";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";
import { formatPublisherName } from "@format/formatPublisherName";
import { getTheocraticWeekLabel } from "@date/getTheocraticWeekLabel";
import { StudentAssignmentPdfDownloadButton } from "../student-assignment-pdf-download-button/StudentAssignmentPdfDownloadButton";
import type { MidweekMeetingData } from "@tanstack-db/midweek_meeting_data/midweekMeetingDataSchema";
import type { useClamAssignmentFormsData } from "../../hooks/useClamAssignmentFormsData";

type ParticipantFn = ReturnType<
  typeof useClamAssignmentFormsData
>["participant"];

type AssignmentItem = {
  label: string | null | undefined;
  color: string;
  student: ReturnType<ParticipantFn>;
  assignmentId: string;
  material: string | number | null | undefined;
};

type Props = {
  /** Week ID for date formatting */
  week_id: string;
  meeting: MidweekMeetingData;
  /** Look up a participant by assignment_id */
  participant: ParticipantFn;
  hasSecondSchool: boolean;
};

type PartItemProps = AssignmentItem & {
  week_id: string;
  school: string;
  participant: ParticipantFn;
};

function PartItem({
  label,
  color,
  student,
  assignmentId,
  material,
  week_id,
  school,
  participant,
}: PartItemProps) {
  const date = getTheocraticWeekLabel(week_id, { format: "week-range" });
  const counselor = assignmentId.includes("school_2")
    ? participant("chairman_2")
    : participant("chairman_1");
  const assistantId = assignmentId
    .replace("apply", "assistant")
    .replace("bible_reading", "assistant_reading");
  const assistant = participant(assistantId);
  const filename = `assignment-${student?.last_name || "unknown"}-${assignmentId}`;

  return (
    <Item lines="none">
      <Grid className="ion-text-nowrap ion-no-padding">
        <Row>
          <Col>
            <Text bold color={color}>
              {label}
            </Text>
          </Col>
          {student && (
            <Col size="auto">
              <StudentAssignmentPdfDownloadButton
                date={date}
                school={school}
                student={student}
                assistant={assistant}
                counselor={counselor}
                assignment={label}
                material={material}
                filename={filename}
              />
            </Col>
          )}
        </Row>
        <Row className="ion-padding-start ion-margin-start ion-padding-bottom">
          <Col>
            {student && (
              <Text>
                {formatPublisherName(
                  student as Parameters<typeof formatPublisherName>[0],
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
 * optionally Second School, with individual PDF download buttons per student.
 */
export function StudentPartsList({
  week_id,
  meeting,
  participant,
  hasSecondSchool,
}: Props) {
  const mainHallItems: AssignmentItem[] = [
    {
      label: meeting.mwb_tgw_bread_title,
      color: "jw_slate",
      student: participant("school_1_bible_reading"),
      assignmentId: "school_1_bible_reading",
      material: meeting.mwb_tgw_bread,
    },
    {
      label: meeting.mwb_ayf_part1_title,
      color: "jw_brown",
      student: participant("school_1_apply_1"),
      assignmentId: "school_1_apply_1",
      material: meeting.mwb_ayf_part1,
    },
    {
      label: meeting.mwb_ayf_part2_title,
      color: "jw_brown",
      student: participant("school_1_apply_2"),
      assignmentId: "school_1_apply_2",
      material: meeting.mwb_ayf_part2,
    },
    {
      label: meeting.mwb_ayf_part3_title,
      color: "jw_brown",
      student: participant("school_1_apply_3"),
      assignmentId: "school_1_apply_3",
      material: meeting.mwb_ayf_part3,
    },
    {
      label: meeting.mwb_ayf_part4_title,
      color: "jw_brown",
      student: participant("school_1_apply_4"),
      assignmentId: "school_1_apply_4",
      material: meeting.mwb_ayf_part4,
    },
  ];

  const secondSchoolItems: AssignmentItem[] = [
    {
      label: meeting.mwb_tgw_bread_title,
      color: "jw_slate",
      student: participant("school_2_bible_reading"),
      assignmentId: "school_2_bible_reading",
      material: meeting.mwb_tgw_bread,
    },
    {
      label: meeting.mwb_ayf_part1_title,
      color: "jw_brown",
      student: participant("school_2_apply_1"),
      assignmentId: "school_2_apply_1",
      material: meeting.mwb_ayf_part1,
    },
    {
      label: meeting.mwb_ayf_part2_title,
      color: "jw_brown",
      student: participant("school_2_apply_2"),
      assignmentId: "school_2_apply_2",
      material: meeting.mwb_ayf_part2,
    },
    {
      label: meeting.mwb_ayf_part3_title,
      color: "jw_brown",
      student: participant("school_2_apply_3"),
      assignmentId: "school_2_apply_3",
      material: meeting.mwb_ayf_part3,
    },
    {
      label: meeting.mwb_ayf_part4_title,
      color: "jw_brown",
      student: participant("school_2_apply_4"),
      assignmentId: "school_2_apply_4",
      material: meeting.mwb_ayf_part4,
    },
  ];

  return (
    <div className="ion-padding">
      <Space height="1.5" />

      {hasSecondSchool && (
        <Item lines="none">
          <Text bold size="xl">
            Main Hall
          </Text>
        </Item>
      )}

      {mainHallItems.map((item, i) =>
        item.label ? (
          <Fragment key={i}>
            <PartItem
              {...item}
              week_id={week_id}
              school={"Main Hall"}
              participant={participant}
            />
          </Fragment>
        ) : null,
      )}

      {hasSecondSchool && (
        <>
          <Space height="1.5" />
          <Item lines="none">
            <Text bold size="xl">
              Second School
            </Text>
          </Item>
          {secondSchoolItems.map((item, i) =>
            item.label ? (
              <Fragment key={i}>
                <PartItem
                  {...item}
                  week_id={week_id}
                  school="Second School"
                  participant={participant}
                />
              </Fragment>
            ) : null,
          )}
        </>
      )}
    </div>
  );
}
