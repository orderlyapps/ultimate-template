import { Text } from "@ionic-display/text/Text";
import { IonButton, IonIcon } from "@ionic/react";
import { warningOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { ExportPublishersButton } from "./components/ExportPublishersButton";
import { usePublishersForExport } from "./hooks/usePublishersForExport";

/**
 * SecretaryContent - Content for the Secretary page.
 * Only accessible to users with the secretary permission.
 * Includes PDF export functionality for publisher contact information.
 */
export function SecretaryContent() {
  const { data: publishers, isLoading, error } = usePublishersForExport();
  const history = useHistory();

  const navigateToMissingDetails = () => {
    history.push("/home/tools/secretary/missing-details");
  };

  return (
    <div>
      <Text>Secretary Tools</Text>
      
      <IonButton
        expand="block"
        fill="outline"
        onClick={navigateToMissingDetails}
        style={{ marginBottom: "16px" }}
      >
        <IonIcon slot="start" icon={warningOutline} />
        Missing Details
      </IonButton>
      
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
