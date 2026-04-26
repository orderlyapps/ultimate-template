import { publisherCollection } from "@tanstack-db/publisher/publisherCollection";
import { eq, or, useLiveQuery } from "@tanstack/react-db";
import { formatPublisherName } from "@format/formatPublisherName";
import { IonAlert } from "@ionic/react";
import { useState } from "react";
import { useAuth } from "@services/app/auth/useAuth";
import { useUserPublisher } from "../use-user-publisher/useUserPublisher";
import { TypeaheadPublisherModal } from "./components/typeahead-publisher-modal/TypeaheadPublisherModal";

export const SelectUserPublisherModal: React.FC = () => {
  const [publisher, setPublisher] = useUserPublisher();
  const { isAuthenticated, signOut } = useAuth();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const { data } = useLiveQuery((q) =>
    q
      .from({ p: publisherCollection })
      .where(({ p }) =>
        or(
          eq(p.type, "regular_pioneer"),
          eq(p.type, "continuous_auxillary_pioneer"),
          eq(p.type, "publisher"),
        ),
      ),
  );

  const options = data?.map((p) => ({
    value: p.id,
    label: formatPublisherName(p, "display last"),
  }));

  const applySelection = (value: string | null) => {
    setPublisher(data?.find((p) => p.id === value));
  };

  const handleValueChange = (value: string | null) => {
    if (isAuthenticated && value && value !== publisher?.id) {
      setPendingId(value);
      return;
    }
    applySelection(value);
  };

  return (
    <>
      <TypeaheadPublisherModal
        options={options ?? []}
        label="User Details"
        value={publisher?.id}
        onValueChange={handleValueChange}
      />
      <IonAlert
        isOpen={!!pendingId}
        onDidDismiss={() => setPendingId(null)}
        header="Switch User Details?"
        message="You are currently logged in. Switching to different user details will log you out, and you will need a new login code to log back in."
        buttons={[
          { text: "Cancel", role: "cancel" },
          {
            text: "Switch & Log Out",
            role: "destructive",
            handler: async () => {
              const id = pendingId;
              setPendingId(null);
              try {
                await signOut();
              } catch (error) {
                console.error("Failed to sign out:", error);
              }
              applySelection(id);
            },
          },
        ]}
      />
    </>
  );
};
