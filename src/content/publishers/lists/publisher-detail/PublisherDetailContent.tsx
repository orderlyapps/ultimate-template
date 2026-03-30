import { ConfidentialData } from "@/content/publishers/lists/publisher-detail/components/confidential-data/ConfidentialData";
import { PublisherDetailView } from "@/content/publishers/lists/publisher-detail/components/publisher-detail-view/PublisherDetailView";

export const PublisherDetailContent: React.FC = () => {
  return (
    <>
      <PublisherDetailView />
      <ConfidentialData />
    </>
  );
};
