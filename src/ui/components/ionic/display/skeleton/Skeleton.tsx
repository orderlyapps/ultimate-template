import { IonSkeletonText } from "@ionic/react";
import type { ComponentProps } from "react";

type SkeletonProps = ComponentProps<typeof IonSkeletonText>;

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  return <IonSkeletonText {...props} />;
};
