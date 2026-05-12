import CandidateCard from "../../CandidateCard/components/CandidateCard";
import { mapKandidatToCandidate } from "../../utils/mapKandidat";
import { KandidatSanity } from "@/types";

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
        {candidates.map((kandidat) => (
          <CandidateCard key={kandidat.id} kandidat={kandidat} />
        ))}
      </div>
    </section>
  );
};

export default CandidateSection;