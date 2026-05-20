import { useState } from "react";
import {
  IonButton,
  IonItem,
  IonInput,
  IonToggle,
  IonTextarea,
  useIonAlert,
} from "@ionic/react";
import { List } from "@ionic-layout/list/List";
import { reportCollection } from "@tanstack-db/report/reportCollection";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";
import type { Report } from "@tanstack-db/report/reportSchema";
import { Label } from "@ionic-display/label/Label";
import { Space } from "@layout/space/Space";

interface FormState {
  active: boolean;
  hours: string;
  bible_studies: string;
  comments: string;
}

const defaultForm: FormState = {
  active: false,
  hours: "",
  bible_studies: "",
  comments: "",
};

/** Returns the first day of the previous month as "YYYY-MM-01" using local time */
const getPreviousMonthDate = (): string => {
  const now = new Date();
  const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
  const month = now.getMonth() === 0 ? 12 : now.getMonth();
  return `${year}-${String(month).padStart(2, "0")}-01`;
};

type Props = {
  confidentialId: string;
  groupId: string | null;
  date: string;
  existingReport: Report | undefined;
  onSave: () => void;
};

/**
 * Editable form for submitting or updating a publisher's monthly report.
 * Pre-fills from existingReport when present.
 */
export const ReportForm: React.FC<Props> = ({
  confidentialId,
  groupId,
  date,
  existingReport,
  onSave,
}) => {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [initialized, setInitialized] = useState(false);
  const [presentAlert] = useIonAlert();

  /** Pre-fill form when an existing report loads */
  if (existingReport && !initialized) {
    setForm({
      active: existingReport.active,
      hours: existingReport.hours != null ? String(existingReport.hours) : "",
      bible_studies:
        existingReport.bible_studies != null
          ? String(existingReport.bible_studies)
          : "",
      comments: existingReport.comments ?? "",
    });
    setInitialized(true);
  }

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => setForm((prev) => ({ ...prev, [field]: value }));

  const persistReport = () => {
    const congregationId = getUserCongregation()?.id;
    if (!congregationId) return;

    const payload = {
      confidential_id: confidentialId,
      congregation_id: congregationId,
      group_id: groupId,
      date,
      active: form.active,
      hours: form.hours !== "" ? Number(form.hours) : null,
      bible_studies:
        form.bible_studies !== "" ? Number(form.bible_studies) : null,
      comments: form.comments.trim() || null,
    };
    if (existingReport) {
      reportCollection.update(
        confidentialId + congregationId + date,
        (draft) => {
          draft.active = payload.active;
          draft.hours = payload.hours;
          draft.bible_studies = payload.bible_studies;
          draft.comments = payload.comments;
          /** Backfill group_id for legacy reports created before group_id existed */
          if (draft.group_id == null && groupId != null) {
            draft.group_id = groupId;
          }
        },
      );
    } else {
      reportCollection.insert(payload);
    }

    onSave();
  };

  const handleSave = () => {
    // Warn when editing any month other than the standard reporting window
    // (the previous calendar month), as those reports have already been
    // submitted to the branch.
    if (date !== getPreviousMonthDate()) {
      presentAlert({
        header: "Report already submitted",
        message:
          "This report has already been submitted to the branch. Do you want to continue?",
        buttons: [
          { text: "Cancel", role: "cancel" },
          { text: "Continue", handler: () => persistReport() },
        ],
      });
      return;
    }
    persistReport();
  };

  return (
    <>
      <List>
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
            onIonInput={(e) => updateField("hours", e.detail.value ?? "")}
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
              updateField("bible_studies", e.detail.value ?? "")
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
            onIonInput={(e) => updateField("comments", e.detail.value ?? "")}
          />
        </IonItem>
      </List>

      <Space />

      <IonButton expand="block" className="ion-margin-top" onClick={handleSave}>
        {existingReport ? "Update Report" : "Save Report"}
      </IonButton>
    </>
  );
};
