import { IonButtons } from "@ionic/react";
import { SizeButtons } from "@input/size/size-buttons/SizeButtons";
import { useTalksStore } from "@feature/talks/state/useTalksStore";

export function TextSizeControl() {
  const presentationTextSize = useTalksStore(
    (state) => state.presentationTextSize
  );
  const setPresentationTextSize = useTalksStore(
    (state) => state.setPresentationTextSize
  );

  return (
    <IonButtons slot="end">
      <SizeButtons
        value={presentationTextSize}
        onSizeChange={setPresentationTextSize}
      />
    </IonButtons>
  );
}
