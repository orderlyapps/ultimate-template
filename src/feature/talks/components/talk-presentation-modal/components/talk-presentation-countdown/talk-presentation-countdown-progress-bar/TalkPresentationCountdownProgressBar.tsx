import { IonProgressBar } from "@ionic/react";

type Props = {
  value: number;
};

export function TalkPresentationCountdownProgressBar({ value }: Props) {
  return <IonProgressBar value={value} />;
}
