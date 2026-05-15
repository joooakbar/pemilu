import { Text } from '@react-pdf/renderer'
import { styles } from '../styles/pdf.styles'
import { BeritaAcaraData } from '../types'

interface Props {
  election: BeritaAcaraData['election']
  totalDPT: number
  totalSuara: number
}
export default function InfoSection({ election, totalDPT, totalSuara }: Props) {
  return (
    <>
      <Text style={styles.title}>
        BERITA ACARA PEMILIHAN
      </Text>

      <Text style={styles.subtitle}>
        {election.nama}
      </Text>
    </>
  )
}