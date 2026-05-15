import { cn } from '@/lib/utils'

interface Props {
  status: string
}

export default function StatusBadge({ status }: Props) {
  const getColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-green-600'
      case 'SUSPENDED':
        return 'text-amber-600'
      case 'ENDED':
        return 'text-red-600'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <span className={cn('ml-2 font-bold uppercase', getColor(status))}>
      {status}
    </span>
  )
}