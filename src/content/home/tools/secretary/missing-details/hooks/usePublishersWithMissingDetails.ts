import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { publisherLocalCollection } from "@tanstack-db/publisher-local/publisherLocalCollection";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import type { PublisherLocal } from "@state/rxdb/collections/publisher";
import { formatPublisherName } from "@util/format/formatPublisherName";
import { useMissingDetailsFilters } from "../store/useMissingDetailsFilters";

/**
 * Type representing what details might be missing for a publisher
 */
export interface MissingDetails {
  hasPhone: boolean;
  hasAddress: boolean;
  hasEmail: boolean;
  hasEmergencyContact: boolean;
  hasBirthDate: boolean;
  hasBaptismDate: boolean;
}

/**
 * Publisher with missing details information
 */
export interface PublisherWithMissingDetails extends Publisher {
  formattedName: string;
  missingDetails: MissingDetails;
  localData: PublisherLocal | undefined;
}

/**
 * Custom hook to fetch publishers with their missing details information.
 * Applies active filters to show only publishers missing specific information.
 * 
 * @returns Object containing filtered publishers, loading state, and error state
 */
export function usePublishersWithMissingDetails() {
  const {
    filterMissingPhone,
    filterMissingAddress,
    filterMissingEmail,
    filterMissingEmergencyContact,
    filterMissingBirthDate,
    filterMissingBaptismDate,
  } = useMissingDetailsFilters();

  // Fetch main publisher data
  const publishersQuery = useLiveQuery((q) =>
    q.from({ publisher: publisherCollection }),
  );

  // Fetch local publisher data with contact information
  const publishersLocalQuery = useLiveQuery((q) =>
    q.from({ publisherLocal: publisherLocalCollection }),
  );

  // Combine and filter publishers
  const publishers: PublisherWithMissingDetails[] = (
    publishersQuery.data as Publisher[]
  )?.map((publisher: Publisher) => {
    const localData = (publishersLocalQuery.data as PublisherLocal[])?.find(
      (local: PublisherLocal) => local.publisher_id === publisher.id,
    );

    // Determine what details are present
    const missingDetails: MissingDetails = {
      hasPhone: !!(localData?.phone && localData.phone.length > 0),
      hasAddress: !!(localData?.address && localData.address.length > 0),
      hasEmail: !!(localData?.email && localData.email.length > 0),
      hasEmergencyContact: !!(
        localData?.emergency_contact && localData.emergency_contact.length > 0
      ),
      hasBirthDate: !!localData?.birth_date,
      hasBaptismDate: !!localData?.baptism_date,
    };

    return {
      ...publisher,
      formattedName: formatPublisherName(publisher),
      missingDetails,
      localData,
    };
  })
    // Filter out speakers and associates
    .filter(
      (publisher) =>
        publisher.type !== "speaker" &&
        publisher.type !== "associate" &&
        publisher.standing !== "associate",
    )
    // Apply active filters - show publishers missing the selected details
    .filter((publisher) => {
      // If no filters are active, show all publishers
      const anyFilterActive =
        filterMissingPhone ||
        filterMissingAddress ||
        filterMissingEmail ||
        filterMissingEmergencyContact ||
        filterMissingBirthDate ||
        filterMissingBaptismDate;

      if (!anyFilterActive) return true;

      // Show publisher if they are missing ANY of the selected details
      if (filterMissingPhone && !publisher.missingDetails.hasPhone) return true;
      if (filterMissingAddress && !publisher.missingDetails.hasAddress)
        return true;
      if (filterMissingEmail && !publisher.missingDetails.hasEmail) return true;
      if (
        filterMissingEmergencyContact &&
        !publisher.missingDetails.hasEmergencyContact
      )
        return true;
      if (filterMissingBirthDate && !publisher.missingDetails.hasBirthDate)
        return true;
      if (filterMissingBaptismDate && !publisher.missingDetails.hasBaptismDate)
        return true;

      return false;
    })
    .sort((a, b) => {
      // Sort by last_name, then display_name, then first_name
      const lastNameCompare = a.last_name.localeCompare(b.last_name);
      if (lastNameCompare !== 0) return lastNameCompare;

      const displayNameCompare = (a.display_name || "").localeCompare(
        b.display_name || "",
      );
      if (displayNameCompare !== 0) return displayNameCompare;

      return a.first_name.localeCompare(b.first_name);
    }) || [];

  return {
    publishers,
    isLoading:
      publishersQuery.isLoading || publishersLocalQuery.isLoading,
    error:
      publishersQuery.isError || publishersLocalQuery.isError
        ? publishersQuery.isError
          ? new Error("Failed to fetch publishers")
          : new Error("Failed to fetch publisher local data")
        : null,
  };
}
