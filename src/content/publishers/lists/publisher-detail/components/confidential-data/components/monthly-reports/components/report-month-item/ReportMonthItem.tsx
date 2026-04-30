import { useState } from "react";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonTextarea,
  IonToggle,
} from "@ionic/react";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import checkIcon from "@icons/add.svg";
import closeIcon from "@icons/cross.svg";
import editIcon from "@icons/edit.svg";
import { reportCollection } from "@tanstack-db/report/reportCollection";
import type { Report } from "@tanstack-db/report/reportSchema";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";

interface Props {
  /** The month date string (YYYY-MM-01) */
  date: string;
  /** The existing report for this month, if any */
  report: Report | undefined;
  /** Whether the user can edit this report */
  canEdit: boolean;
  /** The publisher's confidential_id */
  confidentialId: string;
  /** The publisher's group_id, if known */
  groupId: string | null;
}

/**
 * Formats a date string (YYYY-MM-01) to a human-readable month label.
 * Example: "2024-01-01" -> "January 2024"
 */
const formatMonthLabel = (date: string): string => {
  return new Date(date + "T00:00:00").toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
};

interface FormState {
  active: boolean;
  hours: string;
  bible_studies: string;
  comments: string;
}

/**
 * Displays a single month's report data.
 * If canEdit is true, allows editing the report.
 */
export const ReportMonthItem: React.FC<Props> = ({
  date,
  report,
  canEdit,
  confidentialId,
  groupId,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState<FormState>(() => ({
    active: report?.active ?? false,
    hours: report?.hours != null ? String(report.hours) : "",
    bible_studies:
      report?.bible_studies != null ? String(report.bible_studies) : "",
    comments: report?.comments ?? "",
  }));

  const monthLabel = formatMonthLabel(date);
  const congregationId = getUserCongregation()?.id;

  const handleSave = () => {
    if (!congregationId) return;

    const payload = {
      confidential_id: confidentialId,
      congregation_id: congregationId,
      group_id: groupId,
      date,
      active: form.active,
      hours: form.hours !== "" ? Number(form.hours) : null,
      bible_studies: form.bible_studies !== "" ? Number(form.bible_studies) : null,
      comments: form.comments.trim() || null,
    };

    if (report) {
      // Update existing report
      reportCollection.update(
        confidentialId + congregationId + date,
        (draft) => {
          draft.active = payload.active;
          draft.hours = payload.hours;
          draft.bible_studies = payload.bible_studies;
          draft.comments = payload.comments;
          if (draft.group_id == null && groupId != null) {
            draft.group_id = groupId;
          }
        },
      );
    } else {
      // Insert new report
      reportCollection.insert(payload);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setForm({
      active: report?.active ?? false,
      hours: report?.hours != null ? String(report.hours) : "",
      bible_studies:
        report?.bible_studies != null ? String(report.bible_studies) : "",
      comments: report?.comments ?? "",
    });
    setIsEditing(false);
  };

  // Read-only view
  if (!canEdit || !isEditing) {
    return (
      <IonItem>
        <div className="ion-padding-vertical" style={{ flex: 1 }}>
          <Text size="sm" bold>
            {monthLabel}
          </Text>
          <div style={{ marginTop: "4px" }}>
            {!report ? (
              <Text size="sm" color="medium">
                No report
              </Text>
            ) : report.active ? (
              <Text size="sm" color="success">
                Active
                {report.hours != null && ` • ${report.hours} hrs`}
                {report.bible_studies != null &&
                  ` • ${report.bible_studies} BS`}
              </Text>
            ) : (
              <Text size="sm" color="medium">
                Inactive
              </Text>
            )}
            {report?.comments && (
              <Text size="xs" color="medium" style={{ marginTop: "2px" }}>
                {report.comments}
              </Text>
            )}
          </div>
        </div>
        {canEdit && (
          <IonButton fill="clear" slot="end" onClick={() => setIsEditing(true)}>
            <IonIcon src={editIcon} slot="icon-only" />
          </IonButton>
        )}
      </IonItem>
    );
  }

  // Edit view
  return (
    <>
      <IonItem>
        <div className="ion-padding-vertical" style={{ flex: 1 }}>
          <Text size="sm" bold>
            {monthLabel}
          </Text>
        </div>
        <IonButton fill="clear" slot="end" onClick={handleCancel}>
          <IonIcon src={closeIcon} slot="icon-only" />
        </IonButton>
        <IonButton fill="clear" slot="end" onClick={handleSave}>
          <IonIcon src={checkIcon} slot="icon-only" />
        </IonButton>
      </IonItem>
      <IonItem>
        <Label>Participated</Label>
        <IonToggle
          slot="end"
          checked={form.active}
          onIonChange={(e) => {
            const checked = e.detail.checked;
            setForm((prev) => ({
              ...prev,
              active: checked,
              hours: checked ? prev.hours : "",
              bible_studies: checked ? prev.bible_studies : "",
            }));
          }}
        />
      </IonItem>
      <IonItem disabled={!form.active}>
        <Label>Hours</Label>
        <IonInput
          className="ion-text-end"
          type="number"
          slot="end"
          min="0"
          value={form.hours}
          placeholder="optional"
          onIonInput={(e) =>
            setForm((prev) => ({ ...prev, hours: e.detail.value ?? "" }))
          }
        />
      </IonItem>
      <IonItem disabled={!form.active}>
        <Label>Bible Studies</Label>
        <IonInput
          slot="end"
          type="number"
          className="ion-text-end"
          min="0"
          value={form.bible_studies}
          onIonInput={(e) =>
            setForm((prev) => ({
              ...prev,
              bible_studies: e.detail.value ?? "",
            }))
          }
        />
      </IonItem>
      <IonItem>
        <Label>Comments</Label>
        <IonTextarea
          slot="end"
          className="ion-text-end"
          value={form.comments}
          autoGrow={true}
          onIonInput={(e) =>
            setForm((prev) => ({ ...prev, comments: e.detail.value ?? "" }))
          }
        />
      </IonItem>
    </>
  );
};
