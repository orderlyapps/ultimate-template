import { IonProgressBar } from "@ionic/react";

type Props = {
  value: number;
};

export function ProgressBar({ value }: Props) {
  return <IonProgressBar value={value} />;
}
