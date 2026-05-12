import { PreviewRekapitulasiData } from '../types'

interface Props {
  pemenang: PreviewRekapitulasiData
}

export default function PreviewWinner({
  pemenang,
}: Props) {

  return (
    <div
      className="
        rounded-lg
        bg-green-50
        border border-green-200
        p-4
        text-center
      "
    >

      <p className="text-sm text-green-700">
        🏆 Pemenang
      </p>

      <p className="font-bold text-green-800 text-lg">
        {pemenang.nama}
      </p>

      <p className="text-sm text-green-600">
        {pemenang.jumlah} suara
      </p>

    </div>
  )
}