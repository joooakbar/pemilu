import { View, Text } from '@react-pdf/renderer'

import { styles } from '../styles/pdf.styles'
import { useFormatDate } from '../hooks/useFormatDate'

interface Props {
  election: {
    startTime: Date
    endTime: Date
  }

  totalDPT: number
  totalSuara: number
}

export default function InfoSection({
  election,
  totalDPT,
  totalSuara,
}: Props) {

  return (
    <View style={styles.section}>

      <View style={styles.row}>
        <Text style={styles.label}>
          Tanggal Mulai
        </Text>

        <Text style={styles.value}>
          {useFormatDate(election.startTime)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Tanggal Selesai
        </Text>

        <Text style={styles.value}>
          {useFormatDate(election.endTime)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Total DPT
        </Text>

        <Text style={styles.value}>
          {totalDPT} pemilih
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Total Suara Sah
        </Text>

        <Text style={styles.value}>
          {totalSuara} suara
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          Partisipasi
        </Text>

        <Text style={styles.value}>
          {
            totalDPT > 0
              ? ((totalSuara / totalDPT) * 100).toFixed(1)
              : 0
          }%
        </Text>
      </View>

    </View>
  )
}