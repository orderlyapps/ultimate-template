import { useParams } from "react-router-dom";

export const WeekendAssignmentEditContent: React.FC = () => {
  const { week_id, assignment_id } = useParams<{
    week_id: string;
    assignment_id: string;
  }>();

  return (
    <div className="p-4">
      <p>Weekend Assignment Edit Content Placeholder</p>
      <p>Week ID: {week_id}</p>
      <p>Assignment ID: {assignment_id}</p>
    </div>
  );
};
