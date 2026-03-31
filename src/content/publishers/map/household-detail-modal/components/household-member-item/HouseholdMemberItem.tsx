import { IonItem, IonLabel, IonSpinner } from "@ionic/react";
import type { HouseholdMember } from "@/content/publishers/map/store/use-publishers-map-store";
import { formatPublisherName } from "@format/formatPublisherName";
import { useHouseholdMemberQuery } from "@/content/publishers/map/household-detail-modal/components/household-member-item/use-household-member-query";

type HouseholdMemberItemProps = {
  member: HouseholdMember;
};

export const HouseholdMemberItem: React.FC<HouseholdMemberItemProps> = ({
  member,
}) => {
  const { data: publisher, isLoading } = useHouseholdMemberQuery(
    member.publisher_id,
  );

  if (isLoading) {
    return (
      <IonItem>
        <IonSpinner name="dots" />
      </IonItem>
    );
  }

  return (
    <IonItem>
      <IonLabel>
        <h2>{formatPublisherName(publisher)}</h2>
        <p>{member.label}</p>
      </IonLabel>
    </IonItem>
  );
};
