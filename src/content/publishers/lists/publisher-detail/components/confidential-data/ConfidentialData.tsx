import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import editIcon from "@icons/edit.svg";
import type { PublisherLocal } from "@state/rxdb/collections/publisher";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { usePublisherLocal } from "@/content/publishers/lists/publisher-detail/hooks/usePublisherLocal";
import { useIsSuperAdmin } from "@/content/settings/profile/admin/components/use-is-super-admin/useIsSuperAdmin";

/** Formats an ISO date string (YYYY-MM-DD) to a human-readable format, e.g. "12 Jan 1990" */
const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/** Returns a string like "34 years, 2 months" since an ISO date string */
const timeSince = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-").map(Number);
  const start = new Date(year, month - 1, day);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  if (now.getDate() < start.getDate()) months -= 1;
  if (months < 0) { years -= 1; months += 12; }
  const yearPart = years > 0 ? `${years} year${years !== 1 ? "s" : ""}` : "";
  const monthPart = months > 0 ? `${months} month${months !== 1 ? "s" : ""}` : "";
  return [yearPart, monthPart].filter(Boolean).join(", ") || "Less than a month";
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
      {publisher.birth_date && (
        <IonItem>
          <IonLabel>
            <h2>Birth Date</h2>
          </IonLabel>
          <Text>
            {formatDate(publisher.birth_date)}
            <br />
            <small>{timeSince(publisher.birth_date)}</small>
          </Text>
        </IonItem>
      )}
      {publisher.baptism_date && (
        <IonItem>
          <IonLabel>
            <h2>Baptism Date</h2>
          </IonLabel>
          <Text>
            {formatDate(publisher.baptism_date)}
            <br />
            <small>{timeSince(publisher.baptism_date)}</small>
          </Text>
        </IonItem>
      )}

      {publisher.phone && publisher.phone.length > 0 && (
        <>
          <Item>Phone</Item>
          {publisher.phone.map((p) => (
            <IonItem key={p.id}>
              <IonLabel>{p.label}</IonLabel>
              <Text>{p.number}</Text>
            </IonItem>
          ))}
        </>
      )}

      {publisher.email && publisher.email.length > 0 && (
        <IonItem>
          <IonLabel>
            <h2>Email</h2>
            {publisher.email.map((e) => (
              <p key={e.id}>
                {e.label}: {e.address}
              </p>
            ))}
          </IonLabel>
        </IonItem>
      )}

      {publisher.address && publisher.address.length > 0 && (
        <IonItem>
          <IonLabel>
            <h2>Address</h2>
            {publisher.address.map((a) => (
              <p key={a.id}>
                {a.label}: {a.unit_number} {a.house_number} {a.street},{" "}
                {a.suburb}
              </p>
            ))}
          </IonLabel>
        </IonItem>
      )}
      {isSuperAdmin && (
        <IonButton
          expand="block"
          onClick={() => history.push(`/publishers/all/${publisherId}/edit`)}
        >
          <IonIcon src={editIcon} slot="start" />
          Edit Publisher
        </IonButton>
      )}
    </IonList>
  );
};
