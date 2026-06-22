import { ElectionDB } from "../types";
import ElectionCard from "./ElectionCard";

interface Props {
  elections: ElectionDB[];
}

export default function ElectionList({ elections }: Props) {
  return (
    <div className="space-y-3">
      {elections.map((election) => (
        <ElectionCard key={election.id} election={election} />
      ))}
    </div>
  );
}
