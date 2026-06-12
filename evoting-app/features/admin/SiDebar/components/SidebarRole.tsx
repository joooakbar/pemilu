"use client";

import { cn } from "@/lib/utils";

interface Props {
  label: string;
  color: string;
}

export default function SidebarRole({ label, color }: Props) {
  return (
    <div className="px-4 pt-3 pb-1">
      <span
        className={cn(
          "inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold",
          color,
        )}
      >
        {label}
      </span>
    </div>
  );
}
