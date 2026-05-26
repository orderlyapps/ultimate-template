import { Text } from "@ionic-display/text/Text";
import { IonList, IonItem, IonLabel, IonToggle, IonBadge } from "@ionic/react";
import { useMissingDetailsFilters } from "./store/useMissingDetailsFilters";
import { usePublishersWithMissingDetails } from "./hooks/usePublishersWithMissingDetails";
import { MissingDetailsList } from "./components/missing-details-list/MissingDetailsList";

/**
 * MissingDetailsContent - Content for the Missing Details page.
 * Allows the secretary to view publishers and filter by missing information
 * such as phone number, address, emergency contact, email, etc.
 */
export function MissingDetailsContent() {
  const {
    filterMissingPhone,
    filterMissingAddress,
    filterMissingEmail,
    filterMissingEmergencyContact,
    filterMissingBirthDate,
    filterMissingBaptismDate,
    toggleFilter,
  } = useMissingDetailsFilters();

  const { publishers, isLoading, error } = usePublishersWithMissingDetails();

  const activeFilterCount = [
    filterMissingPhone,
    filterMissingAddress,
    filterMissingEmail,
    filterMissingEmergencyContact,
    filterMissingBirthDate,
    filterMissingBaptismDate,
  ].filter(Boolean).length;

  return (
    <div>
      <Text>Filter by missing information:</Text>
      
      <IonList>
        <IonItem>
          <IonLabel>Missing Phone Number</IonLabel>
          <IonToggle
            checked={filterMissingPhone}
            onIonChange={() => toggleFilter("filterMissingPhone")}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Missing Address</IonLabel>
          <IonToggle
            checked={filterMissingAddress}
            onIonChange={() => toggleFilter("filterMissingAddress")}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Missing Email</IonLabel>
          <IonToggle
            checked={filterMissingEmail}
            onIonChange={() => toggleFilter("filterMissingEmail")}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Missing Emergency Contact</IonLabel>
          <IonToggle
            checked={filterMissingEmergencyContact}
            onIonChange={() => toggleFilter("filterMissingEmergencyContact")}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Missing Birth Date</IonLabel>
          <IonToggle
            checked={filterMissingBirthDate}
            onIonChange={() => toggleFilter("filterMissingBirthDate")}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Missing Baptism Date</IonLabel>
          <IonToggle
            checked={filterMissingBaptismDate}
            onIonChange={() => toggleFilter("filterMissingBaptismDate")}
          />
        </IonItem>
      </IonList>

      <div style={{ marginTop: "16px", marginBottom: "8px" }}>
        <Text>
          Showing {publishers.length} publisher{publishers.length !== 1 ? "s" : ""}
          {activeFilterCount > 0 && (
            <IonBadge color="primary" style={{ marginLeft: "8px" }}>
              {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""} active
            </IonBadge>
          )}
        </Text>
      </div>

      <MissingDetailsList
        publishers={publishers}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
