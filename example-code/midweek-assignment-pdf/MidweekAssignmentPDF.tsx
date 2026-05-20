import { formatPublisherName } from "@format/formatPublisherName";
import { formatWeekLabel } from "@format/formatWeekLabel";
import { useWeekID } from "@hooks/useWeekID";
import { Button } from "@input/button/Button";
import {
  Page,
  Document,
  View,
  Text,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { midweekAssignmentCollection } from "@tables/midweek_assignment/collection";
import type { MidweekAssignmentID } from "@tables/midweek_assignment/schemas/schemas/midweekAssignmentIDSchema";
import { midweekMeetingDataCollection } from "@tables/midweek_meeting_data/collection";
import type { MidweekMeetingData } from "@tables/midweek_meeting_data/schemas/midweekMeetingData";
import { publisherCollection } from "@tables/publisher/collection";
import { and, eq, useLiveQuery } from "@tanstack/react-db";

type MidweekAssignPDF = { assignment_id: MidweekAssignmentID };

type MidweekAssignmentPDFData = {
  data: {
    date: string;
    school: string;
    student: string;
    assistant?: string;
    counselor: string;
    material: string | number | null | undefined;
    assignment: string | number | null | undefined;
  };
};

interface MidweekAssignmentPDFKeyLabelProps {
  label: string;
  value: string | number;
}

export const MidweekAssignmentPDFKeyLabel: React.FC<
  MidweekAssignmentPDFKeyLabelProps
> = ({ label, value }) => {
  return (
    <View style={{ flexDirection: "row", paddingVertical: 5 }}>
      <View style={{ paddingHorizontal: 5, width: 90, textAlign: "right" }}>
        <Text style={{ fontWeight: "bold" }}>{label}</Text>
      </View>
      <View style={{ width: 185 }}>
        <Text>{value}</Text>
      </View>
    </View>
  );
};

export const BasicPDFDocument: React.FC<MidweekAssignmentPDFData> = ({
  data: { assistant, counselor, date, material, school, student, assignment },
}) => {
  // console.log(material)
  // console.log(assignment)
  return (
    <Document>
      <Page size="A6">
        <View style={{ padding: 10, fontSize: 13 }}>
          <View
            style={{
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
              paddingVertical: 10,
            }}
          >
            <Text>Our Christian Life & Ministry Meeting Assignment</Text>
          </View>
          {date && <MidweekAssignmentPDFKeyLabel label="Date:" value={date} />}
          {student && (
            <MidweekAssignmentPDFKeyLabel label="Student:" value={student} />
          )}
          {assistant && (
            <MidweekAssignmentPDFKeyLabel
              label="Assistant:"
              value={assistant}
            />
          )}
          {school && (
            <MidweekAssignmentPDFKeyLabel label="School:" value={school} />
          )}
          {counselor && (
            <MidweekAssignmentPDFKeyLabel
              label="Counselor:"
              value={counselor}
            />
          )}
          {assignment && (
            <MidweekAssignmentPDFKeyLabel
              label="Assignment:"
              value={assignment}
            />
          )}
          {material && (
            <MidweekAssignmentPDFKeyLabel label="Material:" value={material} />
          )}
        </View>
      </Page>
    </Document>
  );
};

export const MidweekAssignPDF2: React.FC<MidweekAssignPDF> = ({
  assignment_id,
}) => {
  const week_id = useWeekID();

  const { data: student } = useLiveQuery((q) => {
    const result = q
      .from({ midweekAssignment: midweekAssignmentCollection })
      .join(
        { publisher: publisherCollection },
        ({ midweekAssignment, publisher }) =>
          eq(midweekAssignment.participant_id, publisher.id)
      )
      .where(({ midweekAssignment }) =>
        and(
          eq(midweekAssignment.week_id, week_id),
          eq(midweekAssignment.assignment_id, assignment_id)
        )
      )
      .select(({ publisher }) => ({ publisher }));

    return result;
  }, []);

  const { data: assistant } = useLiveQuery((q) => {
    const result = q
      .from({ midweekAssignment: midweekAssignmentCollection })
      .join(
        { publisher: publisherCollection },
        ({ midweekAssignment, publisher }) =>
          eq(midweekAssignment.participant_id, publisher.id)
      )
      .where(({ midweekAssignment }) =>
        and(
          eq(midweekAssignment.week_id, week_id),
          eq(
            midweekAssignment.assignment_id,
            assignment_id.replace("apply", "assistant")
          )
        )
      )
      .select(({ publisher }) => ({ publisher }));

    return result;
  }, []);

  const { data: counselor } = useLiveQuery((q) => {
    const result = q
      .from({ midweekAssignment: midweekAssignmentCollection })
      .leftJoin(
        { publisher: publisherCollection },
        ({ midweekAssignment, publisher }) =>
          eq(midweekAssignment.participant_id, publisher.id)
      )
      .where(({ midweekAssignment }) =>
        and(
          eq(midweekAssignment.week_id, week_id),
          eq(
            midweekAssignment.assignment_id,
            assignment_id.includes("school_2")
              ? "chairman_2"
              : assignment_id.includes("school_3")
              ? "chairman_3"
              : "chairman_1"
          )
        )
      )
      .select(({ publisher }) => ({ publisher }));

    return result;
  }, []);

  const { data: meetingData } = useLiveQuery((q) => {
    const result = q
      .from({ meetingData: midweekMeetingDataCollection })
      .where(({ meetingData }) => eq(meetingData.week_id, week_id))
      .findOne();
    return result;
  }, []);

  const school = assignment_id.match(/\d+/)?.[0] || "";
  const assignmentNumber = assignment_id.match(/\d+$/)?.[0] || "";

  const assignment =
    meetingData?.[
      ("mwb_ayf_part" + assignmentNumber + "_title") as keyof MidweekMeetingData
    ];

  const material =
    meetingData?.[
      ("mwb_ayf_part" + assignmentNumber) as keyof MidweekMeetingData
    ];

  const data = {
    date: formatWeekLabel(week_id),
    school:
      school === "1"
        ? "Main Hall"
        : school === "2"
        ? "Second School"
        : "Third School",
    student: formatPublisherName(student[0]?.publisher, "display last"),
    assistant: assistant[0]?.publisher
      ? formatPublisherName(assistant[0]?.publisher, "display last")
      : undefined,
    counselor: formatPublisherName(counselor[0]?.publisher, "display last"),
    material,
    assignment,
  };

  return <BasicPDFDocument data={data} />;
};

export const MidweekAssignPDF: React.FC<MidweekAssignPDF> = ({
  assignment_id,
}) => {
  const week_id = useWeekID();

  const { data: student } = useLiveQuery((q) => {
    const result = q
      .from({ midweekAssignment: midweekAssignmentCollection })
      .join(
        { publisher: publisherCollection },
        ({ midweekAssignment, publisher }) =>
          eq(midweekAssignment.participant_id, publisher.id)
      )
      .where(({ midweekAssignment }) =>
        and(
          eq(midweekAssignment.week_id, week_id),
          eq(midweekAssignment.assignment_id, assignment_id)
        )
      )
      .select(({ publisher }) => ({ publisher }));

    return result;
  }, []);

  const { data: assistant } = useLiveQuery((q) => {
    const result = q
      .from({ midweekAssignment: midweekAssignmentCollection })
      .join(
        { publisher: publisherCollection },
        ({ midweekAssignment, publisher }) =>
          eq(midweekAssignment.participant_id, publisher.id)
      )
      .where(({ midweekAssignment }) =>
        and(
          eq(midweekAssignment.week_id, week_id),
          eq(
            midweekAssignment.assignment_id,
            assignment_id.replace("apply", "assistant")
          )
        )
      )
      .select(({ publisher }) => ({ publisher }));

    return result;
  }, []);

  const { data: counselor } = useLiveQuery((q) => {
    const result = q
      .from({ midweekAssignment: midweekAssignmentCollection })
      .leftJoin(
        { publisher: publisherCollection },
        ({ midweekAssignment, publisher }) =>
          eq(midweekAssignment.participant_id, publisher.id)
      )
      .where(({ midweekAssignment }) =>
        and(
          eq(midweekAssignment.week_id, week_id),
          eq(
            midweekAssignment.assignment_id,
            assignment_id.includes("school_2")
              ? "chairman_2"
              : assignment_id.includes("school_3")
              ? "chairman_3"
              : "chairman_1"
          )
        )
      )
      .select(({ publisher }) => ({ publisher }));

    return result;
  }, []);

  const { data: meetingData } = useLiveQuery((q) => {
    const result = q
      .from({ meetingData: midweekMeetingDataCollection })
      .where(({ meetingData }) => eq(meetingData.week_id, week_id))
      .findOne();
    return result;
  }, []);

  const school = assignment_id.match(/\d+/)?.[0] || "";
  const assignmentNumber = assignment_id.match(/\d+$/)?.[0] || "";

  const assignment = assignment_id.includes("apply")
    ? meetingData?.[
        ("mwb_ayf_part" +
          assignmentNumber +
          "_title") as keyof MidweekMeetingData
      ]
    : meetingData?.["mwb_tgw_bread_title" as keyof MidweekMeetingData];

  const material = assignment_id.includes("apply")
    ? meetingData?.[
        ("mwb_ayf_part" + assignmentNumber) as keyof MidweekMeetingData
      ]
    : meetingData?.["mwb_tgw_bread" as keyof MidweekMeetingData];

  console.log(assignment);
  console.log(material);

  const data = {
    date: formatWeekLabel(week_id),
    school:
      school === "1"
        ? "Main Hall"
        : school === "2"
        ? "Second School"
        : "Third School",
    student: formatPublisherName(student[0]?.publisher, "display last"),
    assistant:
      assistant[0]?.publisher && assignment_id.includes("apply")
        ? formatPublisherName(assistant[0]?.publisher, "display last")
        : undefined,
    counselor: formatPublisherName(counselor[0]?.publisher, "display last"),
    material,
    assignment,
  };
  return (
    <PDFDownloadLink
      document={<BasicPDFDocument data={data} />}
      fileName="Assignment.pdf"
    >
      {({ loading }) => (
        <Button>
          {loading ? "Loading document..." : "Download Assignment PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};
