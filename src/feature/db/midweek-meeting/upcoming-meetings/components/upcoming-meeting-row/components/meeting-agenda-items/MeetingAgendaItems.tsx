import { Fragment, type FC } from "react";
import { Item } from "@ionic-layout/item/Item";
import type { MidweekMeetingData } from "@tanstack-db/midweek_meeting_data/midweekMeetingDataSchema";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { Text } from "@ionic-display/text/Text";
import { midweekAssignmentCollection } from "@tanstack-db/midweek_assignment/midweekAssignemtCollection";
import { eq, useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { Space } from "@layout/space/Space";
import { formatPublisherName } from "@format/formatPublisherName";

type Props = {
  meeting: MidweekMeetingData;
  weekId: string;
};

export const MeetingAgendaItems: FC<Props> = ({ meeting, weekId }) => {
  const { data } = useLiveQuery((q) =>
    q
      .from({
        m: midweekAssignmentCollection,
      })
      .join(
        {
          p: publisherCollection,
        },
        ({ m, p }) => eq(m.participant_id, p.id),
      )
      .where(({ m }) => eq(m.week_id, weekId))
      .select(({ m, p }) => ({
        assignment_id: m.assignment_id,
        participant: p,
      })),
  );

  const hasSecondSchool = data?.find((d) => d.assignment_id === "chairman_2");

  const items = [
    {
      label: "Chairman",
      color: "medium",
      participant: data?.find((d) => d.assignment_id === "chairman_1")
        ?.participant,
    },
    {
      label: "Prayer",
      color: "medium",
      participant: data?.find((d) => d.assignment_id === "prayer_1")
        ?.participant,
    },
    {
      label: meeting.mwb_tgw_talk_title,
      color: "jw_slate",
      participant: data?.find((d) => d.assignment_id === "treasures")
        ?.participant,
    },
    {
      label: meeting.mwb_tgw_gems_title,
      color: "jw_slate",
      participant: data?.find((d) => d.assignment_id === "gems")?.participant,
    },
    {
      label: meeting.mwb_tgw_bread_title,
      color: "jw_slate",
      participant: data?.find(
        (d) => d.assignment_id === "school_1_bible_reading",
      )?.participant,
      schoolHeading: "Main Hall",
    },
    {
      label: meeting.mwb_ayf_part1_title,
      color: "jw_brown",
      participant: data?.find((d) => d.assignment_id === "school_1_apply_1")
        ?.participant,
      assistant: data?.find((d) => d.assignment_id === "school_1_assistant_1")
        ?.participant,
    },
    {
      label: meeting.mwb_ayf_part2_title,
      color: "jw_brown",
      participant: data?.find((d) => d.assignment_id === "school_1_apply_2")
        ?.participant,
      assistant: data?.find((d) => d.assignment_id === "school_1_assistant_2")
        ?.participant,
    },
    {
      label: meeting.mwb_ayf_part3_title,
      color: "jw_brown",
      participant: data?.find((d) => d.assignment_id === "school_1_apply_3")
        ?.participant,
      assistant: data?.find((d) => d.assignment_id === "school_1_assistant_3")
        ?.participant,
    },
    {
      label: meeting.mwb_ayf_part4_title,
      color: "jw_brown",
      participant: data?.find((d) => d.assignment_id === "school_1_apply_4")
        ?.participant,
      assistant: data?.find((d) => d.assignment_id === "school_1_assistant_4")
        ?.participant,
    },
    {
      label: "Counselor",
      color: "medium",
      participant: data?.find((d) => d.assignment_id === "chairman_2")
        ?.participant,
      schoolHeading: "Second School",
      secondSchool: true,
    },
    {
      label: meeting.mwb_tgw_bread_title,
      color: "jw_slate",
      participant: data?.find(
        (d) => d.assignment_id === "school_2_bible_reading",
      )?.participant,
      secondSchool: true,
    },
    {
      label: meeting.mwb_ayf_part1_title,
      color: "jw_brown",
      participant: data?.find((d) => d.assignment_id === "school_2_apply_1")
        ?.participant,
      assistant: data?.find((d) => d.assignment_id === "school_2_assistant_1")
        ?.participant,
      secondSchool: true,
    },
    {
      label: meeting.mwb_ayf_part2_title,
      color: "jw_brown",
      participant: data?.find((d) => d.assignment_id === "school_2_apply_2")
        ?.participant,
      assistant: data?.find((d) => d.assignment_id === "school_2_assistant_2")
        ?.participant,
      secondSchool: true,
    },
    {
      label: meeting.mwb_ayf_part3_title,
      color: "jw_brown",
      participant: data?.find((d) => d.assignment_id === "school_2_apply_3")
        ?.participant,
      assistant: data?.find((d) => d.assignment_id === "school_2_assistant_3")
        ?.participant,
      secondSchool: true,
    },
    {
      label: meeting.mwb_ayf_part4_title,
      color: "jw_brown",
      participant: data?.find((d) => d.assignment_id === "school_2_apply_4")
        ?.participant,
      assistant: data?.find((d) => d.assignment_id === "school_2_assistant_4")
        ?.participant,
      secondSchool: true,
    },
    {
      label: meeting.mwb_lc_part1_title,
      color: "jw_red",
      participant: data?.find((d) => d.assignment_id === "living_1")
        ?.participant,
    },
    {
      label: meeting.mwb_lc_part2_title,
      color: "jw_red",
      participant: data?.find((d) => d.assignment_id === "living_2")
        ?.participant,
    },
    {
      label: meeting.mwb_lc_cbs_title,
      color: "jw_red",
      participant: data?.find((d) => d.assignment_id === "cbs_conductor")
        ?.participant,
      reader: data?.find((d) => d.assignment_id === "cbs_reader")?.participant,
    },
    {
      label: "Prayer",
      color: "medium",
      participant: data?.find((d) => d.assignment_id === "prayer_2")
        ?.participant,
    },
  ];

  return (
    <>
      {items.map(
        (
          {
            label,
            color,
            participant,
            reader,
            assistant,
            schoolHeading,
            secondSchool,
          },
          index,
        ) => {
          if (!label || (!hasSecondSchool && secondSchool)) {
            return null;
          }

          return (
            <Fragment key={index}>
              {hasSecondSchool && schoolHeading && (
                <>
                  <Space height="1.5" />
                  <Item>
                    <Text bold size="xl">
                      {schoolHeading}
                    </Text>
                  </Item>
                </>
              )}
              <Item>
                <Grid className="ion-text-nowrap">
                  <Row>
                    <Col>
                      <Text bold color={color}>
                        {label}
                      </Text>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {participant && (
                        <Text>
                          {formatPublisherName(participant, "display last")}
                          <br />
                        </Text>
                      )}

                      {reader && (
                        <Text>
                          Reader: {formatPublisherName(reader, "display last")}
                        </Text>
                      )}

                      {assistant && (
                        <Text>
                          Assistant:{" "}
                          {formatPublisherName(assistant, "display last")}
                        </Text>
                      )}
                    </Col>
                  </Row>
                </Grid>
              </Item>
            </Fragment>
          );
        },
      )}
    </>
  );
};
