import { AddButton } from "@input/button/add-button/AddButton";
import { usePublisherListsStore } from "../../store/usePublisherListsStore";

export const PublisherListsHeaderButtons: React.FC = () => {
  const { setIsAddModalOpen } = usePublisherListsStore();

  return <AddButton onClick={() => setIsAddModalOpen(true)} />;
};
