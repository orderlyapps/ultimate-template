import { PublishersList } from "@/content/publishers/lists/components/publisher-lists-body/PublishersList";
import { PublisherListsModals } from "./components/publisher-lists-modals/PublisherListsModals";

export const PublisherListsContent: React.FC = () => {
  return (
    <>
      <PublishersList />
      <PublisherListsModals />
    </>
  );
};
