import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page:     { padding: 48, fontFamily: 'Helvetica', fontSize: 11 },
  title:    { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 12, textAlign: 'center', color: '#555', marginBottom: 24 },
  section:  { marginBottom: 16 },
  row:      { flexDirection: 'row', justifyContent: 'space-between', padding: '6 0', borderBottom: '1 solid #eee' },
  label:    { color: '#666', flex: 1 },
  value:    { fontWeight: 'bold', flex: 1, textAlign: 'right' },
  winner:   { marginTop: 16, padding: 12, backgroundColor: '#f0fdf4', borderRadius: 6, textAlign: 'center' },
})

interface Data {
  election:  { nama: string; startTime: Date; endTime: Date }
  totalDPT:  number
  totalSuara: number
  rekapitulasi: { nomor: number; nama: string; jumlah: number }[]
  generatedAt: Date
}

export function BeritaAcaraPDF({ data }: { data: Data }) {
  const { election, totalDPT, totalSuara, rekapitulasi, generatedAt } = data
  const pemenang = rekapitulasi.reduce((a, b) => b.jumlah > a.jumlah ? b : a, rekapitulasi[0])
  const fmt      = (d: Date) => new Date(d).toLocaleString('id-ID')

  return (
    <Document title="Berita Acara Pemilihan">
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>BERITA ACARA PEMILIHAN</Text>
        <Text style={styles.subtitle}>{election.nama}</Text>

        <View style={styles.section}>
          <View style={styles.row}><Text style={styles.label}>Tanggal Mulai</Text><Text style={styles.value}>{fmt(election.startTime)}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Tanggal Selesai</Text><Text style={styles.value}>{fmt(election.endTime)}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Total DPT</Text><Text style={styles.value}>{totalDPT} pemilih</Text></View>
          <View style={styles.row}><Text style={styles.label}>Total Suara Sah</Text><Text style={styles.value}>{totalSuara} suara</Text></View>
          <View style={styles.row}><Text style={styles.label}>Partisipasi</Text><Text style={styles.value}>{totalDPT > 0 ? ((totalSuara/totalDPT)*100).toFixed(1) : 0}%</Text></View>
        </View>

        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Rekapitulasi Perolehan Suara</Text>
        {rekapitulasi.map(r => (
          <View key={r.nomor} style={styles.row}>
            <Text style={styles.label}>No. {r.nomor} — {r.nama}</Text>
            <Text style={styles.value}>{r.jumlah} suara</Text>
          </View>
        ))}

        {pemenang && (
          <View style={styles.winner}>
            <Text style={{ color: '#166534', fontWeight: 'bold' }}>Pemenang: {pemenang.nama}</Text>
            <Text style={{ color: '#15803d', fontSize: 10 }}>{pemenang.jumlah} suara</Text>
          </View>
        )}

        <Text style={{ marginTop: 32, fontSize: 9, color: '#aaa', textAlign: 'right' }}>
          Dokumen digenerate otomatis oleh E-VOTIS pada {fmt(generatedAt)}
        </Text>
      </Page>
    </Document>
  )
}
