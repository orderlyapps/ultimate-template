import { IonItem } from "@ionic/react";

interface TestProps {
  hello: string;
}

export const Test: React.FC<TestProps> = ({ hello }) => {
  return (
    <IonItem>
      <div>{hello}</div>
    </IonItem>
  );
};
