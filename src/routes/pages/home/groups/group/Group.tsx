import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { AddButton } from "@input/button/add-button/AddButton";
import { useState } from "react";
import { GroupMembersList } from "@feature/db/group/components/group-detail/group-members-list/GroupMembersList";
import { GroupSettings } from "@feature/db/group/components/group-detail/group-settings/GroupSettings";
import { AddMemberModal } from "@feature/db/group/components/group-detail/add-member-modal/AddMemberModal";
import { DeleteGroupAlert } from "@feature/db/group/components/group-detail/delete-group-alert/DeleteGroupAlert";
import { useGroupData } from "@feature/db/group/components/group-detail/hooks/useGroupData";
import { IonButton, IonIcon } from "@ionic/react";
import deleteIcon from "@icons/delete.svg";

export const Group: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { group } = useGroupData(groupId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home/groups" text="Groups" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsDeleteOpen(true)}>
              <IonIcon src={deleteIcon} slot="icon-only" />
            </IonButton>
            <AddButton onClick={() => setIsAddMemberOpen(true)} />
          </IonButtons>
          <IonTitle>{group?.name ?? "Group"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{group?.name ?? "Group"}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <GroupSettings groupId={groupId} />
        <GroupMembersList groupId={groupId} />
        <AddMemberModal
          groupId={groupId}
          isOpen={isAddMemberOpen}
          onDismiss={() => setIsAddMemberOpen(false)}
        />
        <DeleteGroupAlert
          isOpen={isDeleteOpen}
          onDismiss={() => setIsDeleteOpen(false)}
          group={group}
        />
      </IonContent>
    </IonPage>
  );
};
