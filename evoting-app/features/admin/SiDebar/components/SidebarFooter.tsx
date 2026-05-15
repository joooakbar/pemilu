'use client'

export default function SidebarFooter() {
  return (
    <div className="p-3 border-t">
      <a
        href="/studio"
        target="_blank"
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-secondary transition-colors"
      >
        <span>📝</span>

        Sanity Studio ↗
      </a>
    </div>
  )
} 