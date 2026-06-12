import { ElectionDB } from "../types";
import ElectionCard from "./ElectionCard";

interface Props {
  elections: ElectionDB[];
  onEdit: (election: ElectionDB) => void;
}

export default function ElectionList({ elections, onEdit }: Props) {
  return (
    <div className="space-y-3">
      {elections.map((election) => (
        <ElectionCard
          key={election.id}
          election={election}
          onEdit={() => onEdit(election)}
        />
      ))}
    </div>
  );
}
