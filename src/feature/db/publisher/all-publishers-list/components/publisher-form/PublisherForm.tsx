import { IonButton } from "@ionic/react";
import { useState } from "react";
import { useLiveQuery, eq } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { List } from "@ionic-layout/list/List";
import { TextInput } from "@input/text/TextInput";
import { SelectItem } from "@input/select/SelectItem";
import { standingOptions } from "@tanstack-db/publisher/standingSchema";
import { typeOptions } from "@tanstack-db/publisher/typeSchema";
import { genderOptions } from "@tanstack-db/publisher/genderSchema";
import type { PublisherStanding } from "@tanstack-db/publisher/standingSchema";
import type { PublisherType } from "@tanstack-db/publisher/typeSchema";
import type { PublisherGender } from "@tanstack-db/publisher/genderSchema";

interface PublisherFormProps {
  publisherId?: string;
  onSuccess: () => void;
}

interface FormState {
  first_name: string;
  middle_name: string;
  last_name: string;
  display_name: string;
  standing: PublisherStanding;
  type: PublisherType;
  gender: PublisherGender;
}

const defaultFormState: FormState = {
  first_name: "",
  middle_name: "",
  last_name: "",
  display_name: "",
  standing: "publisher",
  type: "publisher",
  gender: "male",
};

export function PublisherForm({ publisherId, onSuccess }: PublisherFormProps) {
  const [formState, setFormState] = useState<FormState>(defaultFormState);
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: publishers } = useLiveQuery((q) =>
    q
      .from({ p: publisherCollection })
      .where(({ p }) => eq(p.id, publisherId ?? ""))
  );

  const existingPublisher = publisherId ? publishers?.[0] : undefined;

  if (existingPublisher && !isInitialized) {
    setFormState({
      first_name: existingPublisher.first_name,
      middle_name: existingPublisher.middle_name ?? "",
      last_name: existingPublisher.last_name,
      display_name: existingPublisher.display_name ?? "",
      standing: existingPublisher.standing,
      type: existingPublisher.type,
      gender: existingPublisher.gender,
    });
    setIsInitialized(true);
  }

  const handleSubmit = () => {
    if (!formState.first_name.trim() || !formState.last_name.trim()) {
      return;
    }

    const congregationId = localStorage.getItem("congregationId");
    if (!congregationId) {
      return;
    }

    if (publisherId && existingPublisher) {
      publisherCollection.update(publisherId, (draft) => {
        draft.first_name = formState.first_name.trim();
        draft.middle_name = formState.middle_name.trim() || null;
        draft.last_name = formState.last_name.trim();
        draft.display_name = formState.display_name.trim() || null;
        draft.standing = formState.standing;
        draft.type = formState.type;
        draft.gender = formState.gender;
      });
    } else {
      publisherCollection.insert({
        id: crypto.randomUUID(),
        congregation_id: congregationId,
        first_name: formState.first_name.trim(),
        middle_name: formState.middle_name.trim() || null,
        last_name: formState.last_name.trim(),
        display_name: formState.display_name.trim() || null,
        standing: formState.standing,
        type: formState.type,
        gender: formState.gender,
        family_id: null,
        group_id: null,
      });
    }

    onSuccess();
  };

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const standingSelectOptions = standingOptions.map((opt) => ({
    value: opt.value,
    label: opt.label,
  }));

  const typeSelectOptions = typeOptions.map((opt) => ({
    value: opt.id,
    label: opt.label,
  }));

  const genderSelectOptions = genderOptions.map((opt) => ({
    value: opt.id,
    label: opt.label,
  }));

  return (
    <>
      <List>
        <TextInput
          label="First Name"
          value={formState.first_name}
          onIonInput={(e) => updateField("first_name", e.detail.value ?? "")}
        />
        <TextInput
          label="Middle Name"
          value={formState.middle_name}
          onIonInput={(e) => updateField("middle_name", e.detail.value ?? "")}
        />
        <TextInput
          label="Last Name"
          value={formState.last_name}
          onIonInput={(e) => updateField("last_name", e.detail.value ?? "")}
        />
        <TextInput
          label="Display Name"
          value={formState.display_name}
          onIonInput={(e) => updateField("display_name", e.detail.value ?? "")}
        />
        <SelectItem
          label="Standing"
          value={formState.standing}
          options={standingSelectOptions}
          onIonChange={(e) => updateField("standing", e.detail.value)}
        />
        <SelectItem
          label="Type"
          value={formState.type}
          options={typeSelectOptions}
          onIonChange={(e) => updateField("type", e.detail.value)}
        />
        <SelectItem
          label="Gender"
          value={formState.gender}
          options={genderSelectOptions}
          onIonChange={(e) => updateField("gender", e.detail.value)}
        />
      </List>
      <IonButton
        expand="block"
        onClick={handleSubmit}
        disabled={!formState.first_name.trim() || !formState.last_name.trim()}
      >
        {publisherId ? "Save Changes" : "Add Publisher"}
      </IonButton>
    </>
  );
}
