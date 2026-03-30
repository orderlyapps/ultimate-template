import { usePublishersMapStore } from "@/content/publishers/map/store/use-publishers-map-store";
import type { usePublishersQuery } from "@/content/publishers/map/publishers-modal/publishers-list/use-publishers-query";

export const useZoomToPublisher = () => {
  const mapRef = usePublishersMapStore((state) => state.mapRef);
  const closeModal = usePublishersMapStore((state) => state.closeModal);

  const handlePublisherClick = (
    publisherLocal: ReturnType<typeof usePublishersQuery>["data"][0]["publiser_local"]
  ) => {
    if (!mapRef || !publisherLocal?.address?.[0]?.coordinates) return;

    const coordinates = publisherLocal.address[0].coordinates;
    if (coordinates.length < 2) return;

    closeModal();

    mapRef.flyTo({
      center: [coordinates[0], coordinates[1]],
      zoom: 17,
      duration: 1200,
    });
  };

  return { handlePublisherClick };
};
