import {
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonSpinner,
  IonText,
} from "@ionic/react";
import type { PublisherWithMissingDetails } from "../../hooks/usePublishersWithMissingDetails";
import { MissingDetailsBadge } from "./components/missing-details-badge/MissingDetailsBadge";
import { PublisherEditAccordionContent } from "./components/publisher-edit-accordion-content/PublisherEditAccordionContent";

/**
 * Props for the MissingDetailsList component
 */
interface MissingDetailsListProps {
  /** Array of publishers with their missing details information */
  publishers: PublisherWithMissingDetails[];
  /** Whether the data is currently loading */
  isLoading: boolean;
  /** Error object if fetching failed */
  error: Error | null;
}

/**
 * MissingDetailsList - Displays a list of publishers as accordions.
 * Each accordion shows missing details badges and expands to reveal
 * inline form inputs to add the missing information.
 */
export function MissingDetailsList({
  publishers,
  isLoading,
  error,
}: MissingDetailsListProps) {
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <IonSpinner name="crescent" />
      </div>
    );
  }

  if (error) {
    return (
      <IonText color="danger">
        <p>Error loading publishers: {error.message}</p>
      </IonText>
    );
  }

  if (publishers.length === 0) {
    return (
      <IonText color="medium">
        <p style={{ textAlign: "center", padding: "20px" }}>
          No publishers found with the selected filters.
        </p>
      </IonText>
    );
  }

  return (
    <IonAccordionGroup>
      {publishers.map((publisher) => (
        <IonAccordion key={publisher.id} value={publisher.id}>
          <IonItem slot="header">
            <IonLabel>
              <h3>{publisher.formattedName}</h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "4px",
                  marginTop: "4px",
                }}
              >
                {!publisher.missingDetails.hasPhone && (
                  <MissingDetailsBadge label="Phone" color="warning" />
                )}
                {!publisher.missingDetails.hasAddress && (
                  <MissingDetailsBadge label="Address" color="warning" />
                )}
                {!publisher.missingDetails.hasEmail && (
                  <MissingDetailsBadge label="Email" color="medium" />
                )}
                {!publisher.missingDetails.hasEmergencyContact && (
                  <MissingDetailsBadge label="Emergency" color="danger" />
                )}
                {!publisher.missingDetails.hasBirthDate && (
                  <MissingDetailsBadge label="Birth Date" color="medium" />
                )}
                {!publisher.missingDetails.hasBaptismDate && (
                  <MissingDetailsBadge label="Baptism" color="medium" />
                )}
              </div>
            </IonLabel>
          </IonItem>
          <div slot="content" className="ion-padding">
            <PublisherEditAccordionContent publisher={publisher} />
          </div>
        </IonAccordion>
      ))}
    </IonAccordionGroup>
  );
}
