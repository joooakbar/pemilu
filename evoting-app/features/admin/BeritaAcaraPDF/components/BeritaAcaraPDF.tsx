import { Document, Page, Text } from "@react-pdf/renderer";

import { styles } from "../styles/pdf.styles";
import { BeritaAcaraData } from "../types";

import HeaderSection from "./HeaderSection";
import InfoSection from "./InfoSection";
import RekapitulasiSection from "./RekapitulasiSection";
import WinnerSection from "./WinnerSection";

import { useFormatDate } from "../hooks/useFormatDate";

type Props = {
  data: BeritaAcaraData;
};

export default function BeritaAcaraPDF({ data }: Props) {
  const { election, totalDPT, totalSuara, rekapitulasi, generatedAt } = data;

  const pemenang = rekapitulasi.reduce(
    (a, b) => (b.jumlah > a.jumlah ? b : a),
    rekapitulasi[0],
  );

  return (
    <Document title="Berita Acara Pemilihan">
      <Page size="A4" style={styles.page}>
        <HeaderSection nama={election.nama} />

        <InfoSection
          election={election}
          totalDPT={totalDPT}
          totalSuara={totalSuara}
        />

        <RekapitulasiSection data={rekapitulasi} />

        {pemenang && <WinnerSection pemenang={pemenang} />}

        <Text
          style={{
            marginTop: 32,
            fontSize: 9,
            color: "#aaa",
            textAlign: "right",
          }}
        >
          Dokumen digenerate otomatis oleh E-VOTIS pada{" "}
          {useFormatDate(generatedAt)}
        </Text>
      </Page>
    </Document>
  );
}
