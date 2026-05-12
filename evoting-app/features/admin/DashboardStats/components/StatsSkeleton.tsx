import { Skeleton }
from '@/components/ui/skeleton'

export default function StatsSkeleton() {

  return (
    <div
      className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-4
      "
    >

      {[...Array(4)].map((_, i) => (

        <Skeleton
          key={i}
          className="
            h-24
            rounded-xl
          "
        />

      ))}

    </div>
  )
}