import { IonItem, IonInput, IonDatetime, IonDatetimeButton, IonModal, useIonAlert, IonIcon } from "@ionic/react";
import { useState } from "react";
import addIcon from "@icons/add.svg";
import { publisherLocalCollection } from "@tanstack-db/publisher-local/publisherLocalCollection";
import type { PublisherWithMissingDetails } from "../../../../hooks/usePublishersWithMissingDetails";
import type { PublisherLocal } from "@state/rxdb/collections/publisher";
import { Label } from "@ionic-display/label/Label";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { Item } from "@ionic-layout/item/Item";
import { Space } from "@layout/space/Space";

/**
 * Props for the PublisherEditAccordionContent component
 */
interface PublisherEditAccordionContentProps {
  /** Publisher with missing details information */
  publisher: PublisherWithMissingDetails;
}

/**
 * Creates a new version metadata object
 */
const createVersion = () => ({
  created_by: "user",
  updated_by: "user",
  created_at: Date.now(),
  updated_at: Date.now(),
});

/**
 * PublisherEditAccordionContent - Inline editing form for a publisher's missing details.
 * Shows input fields only for the data that is missing, allowing quick data entry.
 */
export function PublisherEditAccordionContent({
  publisher,
}: PublisherEditAccordionContentProps) {
  const { missingDetails, id: publisherId, localData } = publisher;
  const [presentAlert] = useIonAlert();

  // Local state for date fields (optimistic UI)
  const [birthDate, setBirthDate] = useState<string>(localData?.birth_date ?? "");
  const [baptismDate, setBaptismDate] = useState<string>(localData?.baptism_date ?? "");

  /**
   * Saves or updates publisher local data.
   * If no local record exists, creates one with just the provided field.
   */
  const saveField = async <K extends keyof PublisherLocal>(
    field: K,
    value: PublisherLocal[K],
  ) => {
    const now = Date.now();

    if (!localData) {
      // Create new record with just this field
      await publisherLocalCollection.insert({
        publisher_id: publisherId,
        confidential_id: crypto.randomUUID(),
        [field]: value,
        version: createVersion(),
      } as PublisherLocal);
    } else {
      // Update existing record
      await publisherLocalCollection.update(publisherId, (draft) => {
        (draft as Record<string, unknown>)[field] = value;
        draft.version.updated_at = now;
      });
    }
  };

  /**
   * Handles adding a phone number via alert dialog
   */
  const handleAddPhone = () => {
    presentAlert({
      header: "Add Phone Number",
      inputs: [
        {
          name: "label",
          type: "text",
          placeholder: "Label",
          value: "Mobile",
        },
        {
          name: "number",
          type: "tel",
          placeholder: "Phone Number",
        },
      ],
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Add",
          handler: async (data: { label?: string; number?: string }) => {
            const newPhone = {
              id: crypto.randomUUID(),
              number: data.number ?? "",
              label: data.label ?? "Mobile",
              version: createVersion(),
            };

            if (!localData) {
              await publisherLocalCollection.insert({
                publisher_id: publisherId,
                confidential_id: crypto.randomUUID(),
                phone: [newPhone],
                version: createVersion(),
              } as PublisherLocal);
            } else {
              const currentPhones = (localData.phone as PublisherLocal["phone"]) ?? [];
              await publisherLocalCollection.update(publisherId, (draft) => {
                draft.phone = [...currentPhones, newPhone];
                draft.version.updated_at = Date.now();
              });
            }
          },
        },
      ],
    });
  };

  /**
   * Handles adding an email address via alert dialog
   */
  const handleAddEmail = () => {
    presentAlert({
      header: "Add Email Address",
      inputs: [
        {
          name: "label",
          type: "text",
          placeholder: "Label",
          value: "Personal",
        },
        {
          name: "address",
          type: "email",
          placeholder: "Email Address",
        },
      ],
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Add",
          handler: async (data: { label?: string; address?: string }) => {
            const newEmail = {
              id: crypto.randomUUID(),
              address: data.address ?? "",
              label: data.label ?? "Personal",
              version: createVersion(),
            };

            if (!localData) {
              await publisherLocalCollection.insert({
                publisher_id: publisherId,
                confidential_id: crypto.randomUUID(),
                email: [newEmail],
                version: createVersion(),
              } as PublisherLocal);
            } else {
              const currentEmails = (localData.email as PublisherLocal["email"]) ?? [];
              await publisherLocalCollection.update(publisherId, (draft) => {
                draft.email = [...currentEmails, newEmail];
                draft.version.updated_at = Date.now();
              });
            }
          },
        },
      ],
    });
  };

  /**
   * Handles adding an emergency contact via alert dialog
   */
  const handleAddEmergencyContact = () => {
    presentAlert({
      header: "Add Emergency Contact",
      inputs: [
        {
          name: "first_name",
          type: "text",
          placeholder: "First Name",
        },
        {
          name: "last_name",
          type: "text",
          placeholder: "Last Name",
        },
        {
          name: "relationship",
          type: "text",
          placeholder: "Relationship",
        },
        {
          name: "phone",
          type: "tel",
          placeholder: "Phone Number",
        },
      ],
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Add",
          handler: async (data: {
            first_name?: string;
            last_name?: string;
            relationship?: string;
            phone?: string;
          }) => {
            const newContact = {
              id: crypto.randomUUID(),
              first_name: data.first_name ?? "",
              last_name: data.last_name ?? "",
              relationship: data.relationship ?? "",
              phone: data.phone
                ? [
                    {
                      id: crypto.randomUUID(),
                      number: data.phone,
                      label: "Primary",
                      version: createVersion(),
                    },
                  ]
                : [],
              version: createVersion(),
            };

            if (!localData) {
              await publisherLocalCollection.insert({
                publisher_id: publisherId,
                confidential_id: crypto.randomUUID(),
                emergency_contact: [newContact],
                version: createVersion(),
              } as PublisherLocal);
            } else {
              const currentContacts =
                (localData.emergency_contact as PublisherLocal["emergency_contact"]) ?? [];
              await publisherLocalCollection.update(publisherId, (draft) => {
                draft.emergency_contact = [...currentContacts, newContact];
                draft.version.updated_at = Date.now();
              });
            }
          },
        },
      ],
    });
  };

  /**
   * Saves birth date when changed
   */
  const handleBirthDateChange = (value: string) => {
    setBirthDate(value);
    saveField("birth_date", value || undefined);
  };

  /**
   * Saves baptism date when changed
   */
  const handleBaptismDateChange = (value: string) => {
    setBaptismDate(value);
    saveField("baptism_date", value || undefined);
  };

  return (
    <div>
      {/* Phone Number */}
      {!missingDetails.hasPhone && (
        <>
          <Item>
            <SectionHeading>Phone Number</SectionHeading>
            <IonIcon
              src={addIcon}
              slot="end"
              onClick={handleAddPhone}
              color="primary"
              style={{ cursor: "pointer" }}
            />
          </Item>
          <Space height="1" />
        </>
      )}

      {/* Email */}
      {!missingDetails.hasEmail && (
        <>
          <Item>
            <SectionHeading>Email Address</SectionHeading>
            <IonIcon
              src={addIcon}
              slot="end"
              onClick={handleAddEmail}
              color="primary"
              style={{ cursor: "pointer" }}
            />
          </Item>
          <Space height="1" />
        </>
      )}

      {/* Address */}
      {!missingDetails.hasAddress && (
        <>
          <Item>
            <SectionHeading>Address</SectionHeading>
          </Item>
          <IonItem>
            <Label>Quick Add (Basic)</Label>
            <IonInput
              slot="end"
              className="ion-text-end"
              placeholder="Enter address..."
              onIonBlur={(e) => {
                const value = (e as unknown as { detail: { value?: string } }).detail.value;
                if (value) {
                  const newAddress = {
                    id: crypto.randomUUID(),
                    label: "Home",
                    unit_number: "",
                    house_number: "",
                    street: value,
                    suburb: "",
                    coordinates: [],
                    version: createVersion(),
                  };
                  saveField("address", [newAddress]);
                }
              }}
            />
          </IonItem>
          <Space height="1" />
        </>
      )}

      {/* Emergency Contact */}
      {!missingDetails.hasEmergencyContact && (
        <>
          <Item>
            <SectionHeading>Emergency Contact</SectionHeading>
            <IonIcon
              src={addIcon}
              slot="end"
              onClick={handleAddEmergencyContact}
              color="primary"
              style={{ cursor: "pointer" }}
            />
          </Item>
          <Space height="1" />
        </>
      )}

      {/* Birth Date */}
      {!missingDetails.hasBirthDate && (
        <>
          <Item>
            <SectionHeading>Birth Date</SectionHeading>
          </Item>
          <IonItem>
            <Label>Date of Birth</Label>
            <IonDatetimeButton datetime={`birth-${publisherId}`} />
            <IonModal keepContentsMounted>
              <IonDatetime
                id={`birth-${publisherId}`}
                presentation="date"
                showDefaultButtons
                value={birthDate || undefined}
                onIonChange={(e) =>
                  handleBirthDateChange(String(e.detail.value ?? "").slice(0, 10))
                }
              />
            </IonModal>
          </IonItem>
          <Space height="1" />
        </>
      )}

      {/* Baptism Date */}
      {!missingDetails.hasBaptismDate && (
        <>
          <Item>
            <SectionHeading>Baptism Date</SectionHeading>
          </Item>
          <IonItem>
            <Label>Date of Baptism</Label>
            <IonDatetimeButton datetime={`baptism-${publisherId}`} />
            <IonModal keepContentsMounted>
              <IonDatetime
                id={`baptism-${publisherId}`}
                presentation="date"
                showDefaultButtons
                value={baptismDate || undefined}
                onIonChange={(e) =>
                  handleBaptismDateChange(String(e.detail.value ?? "").slice(0, 10))
                }
              />
            </IonModal>
          </IonItem>
          <Space height="1" />
        </>
      )}

      <Space height="2" />
    </div>
  );
}
