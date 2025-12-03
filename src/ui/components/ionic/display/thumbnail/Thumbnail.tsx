import { IonThumbnail } from "@ionic/react";
import type { ComponentProps } from "react";

type ThumbnailProps = ComponentProps<typeof IonThumbnail>;

export const Thumbnail: React.FC<ThumbnailProps> = ({ children, ...props }) => {
  return <IonThumbnail {...props}>{children}</IonThumbnail>;
};
