import { useParams } from "react-router-dom";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

export const MapDetails = () => {
  const { mapID, fileType } = useParams<{ mapID: string; fileType: string }>();

  return (
    <TransformWrapper>
      <TransformComponent
        wrapperStyle={{ height: "100%", width: "100%" }}
        contentStyle={{ height: "100%", width: "100%" }}
      >
        <img
          src={`https://xeagzahtpjviiklooglo.supabase.co/storage/v1/object/public/maps/${mapID}.${fileType}`}
          alt=""
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
        />
      </TransformComponent>
    </TransformWrapper>
  );
};
