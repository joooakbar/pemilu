import { View, Text } from '@react-pdf/renderer'

import { styles } from '../styles/pdf.styles'
import { Rekapitulasi } from '../types'

interface Props {
  pemenang: Rekapitulasi
}

export default function WinnerSection({
  pemenang,
}: Props) {
  return (
    <View style={styles.winner}>
      <Text style={{
        color: '#166534',
        fontWeight: 'bold',
      }}>
        Pemenang: {pemenang.nama}
      </Text>

      <Text style={{
        color: '#15803d',
        fontSize: 10,
      }}>
        {pemenang.jumlah} suara
      </Text>
    </View>
  )
}