import { useState } from "react";
import {
  IonInput,
  IonItem,
  IonTextarea,
  IonToggle,
} from "@ionic/react";
import { Label } from "@ionic-display/label/Label";
import { reportCollection } from "@tanstack-db/report/reportCollection";
import type { Report } from "@tanstack-db/report/reportSchema";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";
import { Space } from "@layout/space/Space";
import { Button } from "@ionic-input/button/Button";

interface Props {
  /** The month date string (YYYY-MM-01) */
  date: string;
  /** The existing report for this month, if any */
  report: Report | undefined;
  /** The publisher's confidential_id */
  confidentialId: string;
  /** The publisher's group_id, if known */
  groupId: string | null;
}

interface FormState {
  active: boolean;
  hours: string;
  bible_studies: string;
  comments: string;
}

const buildInitialState = (report: Report | undefined): FormState => ({
  active: report?.active ?? false,
  hours: report?.hours != null ? String(report.hours) : "",
  bible_studies:
    report?.bible_studies != null ? String(report.bible_studies) : "",
  comments: report?.comments ?? "",
});

/**
 * Editable form fields for a single month's report.
 * Persists changes via reportCollection on save.
 */
export const ReportMonthForm: React.FC<Props> = ({
  date,
  report,
  confidentialId,
  groupId,
}) => {
  const [form, setForm] = useState<FormState>(() => buildInitialState(report));
  const congregationId = getUserCongregation()?.id;

  const handleSave = () => {
    if (!congregationId) return;

    const hours = form.hours !== "" ? Number(form.hours) : null;
    const bible_studies =
      form.bible_studies !== "" ? Number(form.bible_studies) : null;
    const comments = form.comments.trim() || null;

    if (report) {
      reportCollection.update(
        confidentialId + congregationId + date,
        (draft) => {
          draft.active = form.active;
          draft.hours = hours;
          draft.bible_studies = bible_studies;
          draft.comments = comments;
          if (draft.group_id == null && groupId != null) {
            draft.group_id = groupId;
          }
        },
      );
    } else {
      reportCollection.insert({
        confidential_id: confidentialId,
        congregation_id: congregationId,
        group_id: groupId,
        date,
        active: form.active,
        hours,
        bible_studies,
        comments,
      });
    }
  };

  // const handleCancel = () => setForm(buildInitialState(report));

  return (
    <>
      <Space height="1" />
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
      {/* <IonItem lines="none"> */}
      {/* <IonButton slot="end" fill="clear" onClick={handleCancel}>
          Reset
        </IonButton> */}
      {/* </IonItem> */}
      <Space height="2" />
      <Button onClick={handleSave}>Save</Button>
      <Space />
    </>
  );
};
