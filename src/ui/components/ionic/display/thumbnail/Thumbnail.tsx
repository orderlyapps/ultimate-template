import { IonThumbnail } from "@ionic/react";
import type { ComponentProps } from "react";

interface ThumbnailProps extends ComponentProps<typeof IonThumbnail> {}

export const Thumbnail: React.FC<ThumbnailProps> = ({ children, ...props }) => {
  return <IonThumbnail {...props}>{children}</IonThumbnail>;
};
