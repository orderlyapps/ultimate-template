import { Editor } from "@tiptap/react";

import {
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CloseButton } from "@input/button/close-button/CloseButton";
import { RTFEditor } from "@services/vendor/tiptap/editor/RTFEditor";
import type { Size } from "@input/size/size-select/SizeSelect";

export function RTFModalEditor({
  initialContent,
  onUpdate,
  isOpen,
  setIsOpen,
  title,
  fontSize = "md",
}: {
  initialContent?: string | Record<string, unknown>;
  onUpdate?: (editor: Editor) => void;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  fontSize?: Size
  isOpen: boolean;
}) {
  return (
    <IonModal isOpen={isOpen} id="fullscreen">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot="end">
            <CloseButton onClick={() => setIsOpen(false)}></CloseButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={true}>
        <RTFEditor
          initialContent={initialContent}
          canEdit={true}
          onUpdate={onUpdate}
          fontSize={fontSize}
        />
      </IonContent>
    </IonModal>
  );
}
