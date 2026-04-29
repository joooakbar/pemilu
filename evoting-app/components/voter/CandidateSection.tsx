import CandidateCard from "./CandidateCard";
import { mapKandidatToCandidate } from "../../lib/mapKandidat";
import { KandidatSanity } from "../../../index";

type CandidateSectionProps = {
  kandidat: KandidatSanity[];
};

const CandidateSection = ({ kandidat }: CandidateSectionProps) => {
  const candidates = kandidat.map((item) => mapKandidatToCandidate(item, 0));

  return (
    <section className="section kandidat-section" id="kandidat">
      <div className="section-header reveal">
        <div className="section-eyebrow">Pasangan Calon</div>
        <h2>Kenali Kandidatmu</h2>
        <p>
          Pelajari visi, misi, dan program kerja setiap pasangan calon sebelum
          menggunakan hak pilih Anda.
        </p>
      </div>

      <div className="kandidat-grid reveal">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </section>
  );
};

export default CandidateSection;