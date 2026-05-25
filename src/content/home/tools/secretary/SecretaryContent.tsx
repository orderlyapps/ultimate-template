import { Text } from "@ionic-display/text/Text";
import { ExportPublishersButton } from "./components/ExportPublishersButton";
import { usePublishersForExport } from "./hooks/usePublishersForExport";

/**
 * SecretaryContent - Content for the Secretary page.
 * Only accessible to users with the secretary permission.
 * Includes PDF export functionality for publisher contact information.
 */
export function SecretaryContent() {
  const { data: publishers, isLoading, error } = usePublishersForExport();

  return (
    <div>
      <Text>Secretary Tools</Text>
      <ExportPublishersButton 
        publishers={publishers}
        isLoading={isLoading}
        error={error}
        title="Publisher Contact List"
        subtitle={`Generated on ${new Date().toLocaleDateString()}`}
        filename="publisher-contact-list"
      />
    </div>
  );
}
