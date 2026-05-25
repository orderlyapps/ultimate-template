import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSpinner } from "@ionic/react";
import { PdfDownloadButton } from "../../../../../services/vendor/pdf/pdf-download-button";
import type React from "react";
import { PublishersPdfDocument } from "./PublishersPdfDocument";
import type { PublisherWithContacts } from "../hooks/usePublishersForExport";

/**
 * Props for the ExportPublishersButton component
 */
interface ExportPublishersButtonProps {
  /** Array of publishers with their contact information */
  publishers: PublisherWithContacts[];
  /** Whether the data is currently loading */
  isLoading?: boolean;
  /** Any error that occurred while fetching data */
  error?: Error | null;
  /** Custom title for the PDF document */
  title?: string;
  /** Custom subtitle for the PDF document */
  subtitle?: string;
  /** Filename for the downloaded PDF (without .pdf extension) */
  filename?: string;
}

/**
 * A self-contained component that provides PDF export functionality for publisher contact information.
 * Combines the PDF document generation with a download button and handles loading/error states.
 * 
 * This component is designed to be modular and easily removable as requested.
 */
export const ExportPublishersButton: React.FC<ExportPublishersButtonProps> = ({
  publishers,
  isLoading = false,
  error = null,
  title = "Publisher Contact List",
  subtitle,
  filename = "publisher-contact-list",
}) => {
  // If there's an error, show an error message
  if (error) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Export Error</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>Unable to load publisher data for export: {error.message}</p>
        </IonCardContent>
      </IonCard>
    );
  }

  // If data is loading, show a loading state
  if (isLoading) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Export Publishers</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IonSpinner name="crescent" />
            <span>Loading publisher data...</span>
          </div>
        </IonCardContent>
      </IonCard>
    );
  }

  // If no publishers found, show empty state
  if (publishers.length === 0) {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Export Publishers</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p>No publishers found to export.</p>
        </IonCardContent>
      </IonCard>
    );
  }

  // Create the PDF document
  const pdfDocument = (
    <PublishersPdfDocument 
      publishers={publishers} 
      title={title}
      subtitle={subtitle}
    />
  );

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Export Publishers</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>
          Export a PDF containing contact information for all {publishers.length} publishers, 
          including their address, phone number, email, and emergency contact details.
        </p>
        <PdfDownloadButton
          document={pdfDocument}
          filename={filename}
          expand="block"
          fill="outline"
        >
          Export Publisher List to PDF
        </PdfDownloadButton>
      </IonCardContent>
    </IonCard>
  );
};
