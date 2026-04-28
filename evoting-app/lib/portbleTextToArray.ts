export function portableTextToArray(blocks?: unknown[]): string[] {
  if (!Array.isArray(blocks)) return []

  return blocks
    .map((block: any) => {
      if (block?._type !== "block" || !Array.isArray(block.children)) return ""

      return block.children
        .map((child: any) => child?.text || "")
        .join("")
        .trim()
    })
    .filter(Boolean)
}