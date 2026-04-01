import type { usePublishersQuery } from "@/content/publishers/map/publishers-modal/publishers-list-screen/components/publishers-list/use-publishers-query";
import { usePublishersMapStore } from "@/content/publishers/map/store/use-publishers-map-store";

export const useZoomToPublisher = () => {
  const mapRef = usePublishersMapStore((state) => state.mapRef);
  const closeModal = usePublishersMapStore((state) => state.closeModal);

  const handlePublisherClick = (
    publisherLocal: ReturnType<typeof usePublishersQuery>["data"][0]["publisher_local"]
  ) => {
    if (!mapRef || !publisherLocal?.address?.[0]?.coordinates) return;

    const coordinates = publisherLocal.address[0].coordinates;
    if (coordinates.length < 2) return;

    closeModal();

    mapRef.flyTo({
      center: [coordinates[0], coordinates[1]],
      zoom: 17,
      duration: 4000,
    });
  };

  return { handlePublisherClick };
};
