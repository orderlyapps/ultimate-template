import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { publisherLocalCollection } from "@tanstack-db/publisher-local/publisherLocalCollection";
import { streetCollection } from "@tanstack-db/street/streetCollection";
import { suburbCollection } from "@tanstack-db/suburb/suburbCollection";
import type { Publisher } from "@tanstack-db/publisher/publisherSchema";
import type { PublisherLocal } from "@state/rxdb/collections/publisher";
import type { Street } from "@tanstack-db/street/streetSchema";
import type { Suburb } from "@tanstack-db/suburb/suburbSchema";
import { formatPublisherName } from "@util/format/formatPublisherName";

/**
 * Type for address object from PublisherLocal
 */
interface Address {
  id: string;
  label: string;
  unit_number?: string;
  house_number?: string;
  street?: string;
  suburb?: string;
  coordinates?: number[];
  version: {
    created_by: string;
    updated_by: string;
    created_at: number;
    updated_at: number;
  };
}

/**
 * Type for publisher data combined with local contact information
 */
export interface PublisherWithContacts extends Publisher {
  formattedName: string;
  phone?: string;
  email?: string;
  address?: {
    street_line?: string;
    suburb?: string;
  };
  emergency_contact?: {
    first_name: string;
    last_name: string;
    phone?: string;
  };
}

/**
 * Custom hook to fetch publishers with their contact details for export
 * Combines data from main publisher collection and local publisher collection
 * Only selects the first value from each array field as requested
 */
export function usePublishersForExport() {
  // Fetch main publisher data
  const publishersQuery = useLiveQuery((q) => q.from({ publisher: publisherCollection }));
  
  // Fetch local publisher data with contact information
  const publishersLocalQuery = useLiveQuery((q) => q.from({ publisherLocal: publisherLocalCollection }));

  // Fetch street and suburb data for address formatting
  const streetsQuery = useLiveQuery((q) => q.from({ street: streetCollection }));
  const suburbsQuery = useLiveQuery((q) => q.from({ suburb: suburbCollection }));

  // Combine the data, filter out speakers, and sort
  const publishersWithContacts: PublisherWithContacts[] = (publishersQuery.data as Publisher[])?.map((publisher: Publisher) => {
    const localData = (publishersLocalQuery.data as PublisherLocal[])?.find((local: PublisherLocal) => 
      local.publisher_id === publisher.id
    );

    // Format address using street and suburb names
    const formatAddress = (address: Address) => {
      if (!address) return undefined;
      
      const streets = streetsQuery.data as Street[] || [];
      const suburbs = suburbsQuery.data as Suburb[] || [];
      
      // Check if street is an ID (UUID) or a name
      let streetName = address.street;
      if (address.street && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(address.street)) {
        streetName = streets.find(s => s.id === address.street)?.name || address.street;
      }
      
      // Check if suburb is an ID (UUID) or a name
      let suburbName = address.suburb;
      if (address.suburb && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(address.suburb)) {
        suburbName = suburbs.find(s => s.id === address.suburb)?.name || address.suburb;
      }
      
      const numberPart = address.unit_number && address.house_number
        ? `${address.unit_number}/${address.house_number}`
        : address.unit_number || address.house_number;

      return {
        street_line: [numberPart, streetName].filter(Boolean).join(' ') || undefined,
        suburb: suburbName || undefined,
      };
    };

    return {
      ...publisher,
      formattedName: formatPublisherName(publisher),
      phone: localData?.phone?.[0]?.number,
      email: localData?.email?.[0]?.address,
      address: localData?.address?.[0] ? formatAddress(localData.address[0]) : undefined,
      emergency_contact: localData?.emergency_contact?.[0] ? {
        first_name: localData.emergency_contact[0].first_name,
        last_name: localData.emergency_contact[0].last_name,
        phone: localData.emergency_contact[0].phone?.[0]?.number
      } : undefined
    };
  })
  .filter((publisher) => publisher.type !== "speaker" && publisher.type !== "associate" && publisher.standing !== "associate")
  .sort((a, b) => {
    // Sort by last_name, then display_name, then first_name
    const lastNameCompare = a.last_name.localeCompare(b.last_name);
    if (lastNameCompare !== 0) return lastNameCompare;
    
    const displayNameCompare = (a.display_name || "").localeCompare(b.display_name || "");
    if (displayNameCompare !== 0) return displayNameCompare;
    
    return a.first_name.localeCompare(b.first_name);
  }) || [];

  return {
    data: publishersWithContacts,
    isLoading: publishersQuery.isLoading || publishersLocalQuery.isLoading || streetsQuery.isLoading || suburbsQuery.isLoading,
    error: publishersQuery.isError || publishersLocalQuery.isError || streetsQuery.isError || suburbsQuery.isError ? 
      (publishersQuery.isError ? new Error('Failed to fetch publishers') : 
       publishersLocalQuery.isError ? new Error('Failed to fetch publisher local data') :
       streetsQuery.isError ? new Error('Failed to fetch streets') :
       new Error('Failed to fetch suburbs')) : 
      null
  };
}
