import { IonImg } from "@ionic/react";
import type { ComponentProps } from "react";

interface ImgProps extends ComponentProps<typeof IonImg> {}

export const Img: React.FC<ImgProps> = (props) => {
  return <IonImg {...props} />;
};
