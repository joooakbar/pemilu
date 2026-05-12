import { View, Text } from '@react-pdf/renderer'

import { styles } from '../styles/pdf.styles'
import { Rekapitulasi } from '../types'

interface Props {
  data: Rekapitulasi[]
}

export default function RekapitulasiSection({
  data,
}: Props) {

  return (
    <>
      <Text
        style={{
          fontWeight: 'bold',
          marginBottom: 8,
        }}
      >
        Rekapitulasi Perolehan Suara
      </Text>

      {data.map((r) => (
        <View key={r.nomor} style={styles.row}>

          <Text style={styles.label}>
            No. {r.nomor} — {r.nama}
          </Text>

          <Text style={styles.value}>
            {r.jumlah} suara
          </Text>

        </View>
      ))}
    </>
  )
}