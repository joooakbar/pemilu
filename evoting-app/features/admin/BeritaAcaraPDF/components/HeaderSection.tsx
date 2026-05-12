import { Text } from '@react-pdf/renderer'
import { styles } from '../styles/pdf.styles'

interface Props {
  nama: string
}

export default function HeaderSection({ nama }: Props) {
  return (
    <>
      <Text style={styles.title}>
        BERITA ACARA PEMILIHAN
      </Text>

      <Text style={styles.subtitle}>
        {nama}
      </Text>
    </>
  )
}