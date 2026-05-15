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
      <Text style={{
        fontWeight: 'bold',
        marginBottom: 8,
      }}>
        Rekapitulasi Perolehan Suara
      </Text>

      {data.map((item) => (
        <View
          key={item.nomor}
          style={styles.row}
        >
          <Text style={styles.label}>
            No. {item.nomor} — {item.nama}
          </Text>

          <Text style={styles.value}>
            {item.jumlah} suara
          </Text>
        </View>
      ))}
    </>
  )
}