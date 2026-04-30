import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import editIcon from "@icons/edit.svg";
import type { PublisherLocal } from "@state/rxdb/collections/publisher";
import { Text } from "@ionic-display/text/Text";
import { PhoneNumber } from "@ionic-display/phone-number/PhoneNumber";
import { Item } from "@ionic-layout/item/Item";
import { usePublisherLocal } from "@/content/publishers/lists/publisher-detail/hooks/usePublisherLocal";
import { useIsSuperAdmin } from "@/content/settings/profile/admin/components/use-is-super-admin/useIsSuperAdmin";
import { Label } from "@ionic-display/label/Label";
import { SectionHeading } from "@display/section-heading/SectionHeading";
import { Space } from "@layout/space/Space";
import { AddressList } from "./components/address-list/AddressList";
import { EmergencyContactList } from "./components/emergency-contact-list/EmergencyContactList";
import reportIcon from "@icons/check-list.svg";

/** Strips the time component from an ISO date string, returning just YYYY-MM-DD */
const dateOnly = (isoDate: string): string => isoDate.slice(0, 10);

/** Formats an ISO date string (YYYY-MM-DD) to a human-readable format, e.g. "12 Jan 1990" */
const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/** Returns a string like "18 years, 3 months" between two ISO date strings */
const ageAtDate = (birthIso: string, atIso: string): string => {
  const [by, bm, bd] = birthIso.split("-").map(Number);
  const [ay, am, ad] = atIso.split("-").map(Number);
  let years = ay - by;
  let months = am - bm;
  if (ad < bd) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const yearPart = years > 0 ? `${years} year${years !== 1 ? "s" : ""}` : "";
  const monthPart =
    months > 0 ? `${months} month${months !== 1 ? "s" : ""}` : "";
  return (
    [yearPart, monthPart].filter(Boolean).join(", ") || "Less than a month"
  );
};

/** Returns a string like "34 years, 2 months" since an ISO date string */
const timeSince = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-").map(Number);
  const start = new Date(year, month - 1, day);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (now.getDate() < start.getDate()) months -= 1;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const yearPart = years > 0 ? `${years} year${years !== 1 ? "s" : ""}` : "";
  const monthPart =
    months > 0 ? `${months} month${months !== 1 ? "s" : ""}` : "";
  return (
    [yearPart, monthPart].filter(Boolean).join(", ") || "Less than a month"
  );
};

export const ConfidentialData: React.FC = () => {
  const { publisherId } = useParams<{ publisherId: string }>();
  const history = useHistory();
  const { data, isLoading } = usePublisherLocal(publisherId);
  const isSuperAdmin = useIsSuperAdmin();

  if (isLoading) return <p>Loading...</p>;

  const publisher = data?.[0] as PublisherLocal | undefined;

  if (!publisher) {
    return (
      <IonList>
        <IonItem>
          <IonLabel>
            <p>No local data found for this publisher.</p>
          </IonLabel>
        </IonItem>
        {isSuperAdmin && (
          <IonButton
            expand="block"
            onClick={() => history.push(`/publishers/all/${publisherId}/edit`)}
          >
            <IonIcon src={editIcon} slot="start" />
            Add Local Data
          </IonButton>
        )}
      </IonList>
    );
  }

  return (
    <IonList>
      <Space height="1" />
      {(publisher.birth_date || publisher.baptism_date) && (
        <Item>
          <SectionHeading>Dates</SectionHeading>
        </Item>
      )}
      {publisher.birth_date && (
        <IonItem>
          <Label>Birth</Label>
          <div className="ion-text-end ion-margin-vertical">
            <Text size="sm">{formatDate(dateOnly(publisher.birth_date))}</Text>
            <br />
            <Text size="sm">
              {timeSince(dateOnly(publisher.birth_date))}
            </Text>
          </div>
        </IonItem>
      )}
      {publisher.baptism_date && (
        <IonItem>
          <Label>Baptism</Label>
          <div className="ion-text-end ion-margin-vertical">
            <Text size="sm">
              {formatDate(dateOnly(publisher.baptism_date))}
            </Text>
            <br />
            <Text size="sm">
              {publisher.birth_date &&
                `${ageAtDate(dateOnly(publisher.birth_date), dateOnly(publisher.baptism_date))}`}
            </Text>
            <br />
            <Text size="sm">{timeSince(publisher.baptism_date)} ago</Text>
          </div>
        </IonItem>
      )}

      {publisher.phone && publisher.phone.length > 0 && (
        <>
          <Space height="1" />
          <Item>
            <SectionHeading>Phone</SectionHeading>
          </Item>
          {publisher.phone.map((p) => (
            <IonItem key={p.id}>
              <Label>{p.label}</Label>
              <PhoneNumber slot="end" number={p.number} />
            </IonItem>
          ))}
        </>
      )}

      {publisher.email && publisher.email.length > 0 && (
        <>
          <Space height="1" />
          <Item>
            <SectionHeading>Email</SectionHeading>
          </Item>
          {publisher.email.map((e) => (
            <IonItem key={e.id}>
              <Label>{e.label}</Label>
              <Text slot="end">{e.address}</Text>
            </IonItem>
          ))}
        </>
      )}

      <AddressList addresses={publisher.address} />

      <Space height="1" />

      <EmergencyContactList emergencyContacts={publisher.emergency_contact} />

      <Space height="2" />

      <IonButton
        expand="block"
        onClick={() => history.push(`/publishers/all/${publisherId}/reports`)}
      >
        <IonIcon src={reportIcon} slot="start" />
        Monthly Reports
      </IonButton>

      <Space />
      {isSuperAdmin && (
        <IonButton
          expand="block"
          onClick={() => history.push(`/publishers/all/${publisherId}/edit`)}
        >
          <IonIcon src={editIcon} slot="start" />
          Edit Publisher
        </IonButton>
      )}
      <Space />
    </IonList>
  );
};
