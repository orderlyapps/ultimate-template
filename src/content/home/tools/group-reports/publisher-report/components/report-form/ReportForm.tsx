import { useState } from "react";
import { IonButton, IonItem, IonInput, IonToggle, IonLabel } from "@ionic/react";
import { Text } from "@ionic-display/text/Text";
import { List } from "@ionic-layout/list/List";
import { reportCollection } from "@tanstack-db/report/reportCollection";
import { getUserCongregation } from "@feature/db/congregation/user-congregation/get-user-congregation/getUserCongregation";
import type { Report } from "@tanstack-db/report/reportSchema";

interface FormState {
  active: boolean;
  hours: string;
  bible_studies: string;
  comments: string;
}

const defaultForm: FormState = {
  active: true,
  hours: "",
  bible_studies: "",
  comments: "",
};

type Props = {
  confidentialId: string;
  date: string;
  monthLabel: string;
  existingReport: Report | undefined;
  onSave: () => void;
};

/**
 * Editable form for submitting or updating a publisher's monthly report.
 * Pre-fills from existingReport when present.
 */
export const ReportForm: React.FC<Props> = ({
  confidentialId,
  date,
  monthLabel,
  existingReport,
  onSave,
}) => {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [initialized, setInitialized] = useState(false);

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

  const handleSave = () => {
    const congregationId = getUserCongregation()?.id;
    if (!congregationId) return;

    const payload = {
      confidential_id: confidentialId,
      congregation_id: congregationId,
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
        },
      );
    } else {
      reportCollection.insert(payload);
    }

    onSave();
  };

  return (
    <>
      <Text color="medium">{monthLabel}</Text>
      <List>
        <IonItem>
          <IonLabel>Participated in ministry</IonLabel>
          <IonToggle
            slot="end"
            checked={form.active}
            onIonChange={(e) => updateField("active", e.detail.checked)}
          />
        </IonItem>
        {form.active && (
          <>
            <IonItem>
              <IonInput
                label="Hours"
                labelPlacement="stacked"
                type="number"
                min="0"
                value={form.hours}
                placeholder="Leave blank if not applicable"
                onIonInput={(e) => updateField("hours", e.detail.value ?? "")}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Bible Studies"
                labelPlacement="stacked"
                type="number"
                min="0"
                value={form.bible_studies}
                onIonInput={(e) =>
                  updateField("bible_studies", e.detail.value ?? "")
                }
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Comments"
                labelPlacement="stacked"
                value={form.comments}
                onIonInput={(e) =>
                  updateField("comments", e.detail.value ?? "")
                }
              />
            </IonItem>
          </>
        )}
      </List>
      <IonButton expand="block" className="ion-margin-top" onClick={handleSave}>
        {existingReport ? "Update Report" : "Save Report"}
      </IonButton>
    </>
  );
};
