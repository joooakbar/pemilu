export default function UserLoading() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <tr key={i}>
          {[...Array(6)].map((_, j) => (
            <td key={j} className="px-4 py-3">
              <div className="h-4 bg-secondary rounded animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}