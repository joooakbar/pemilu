"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  label: string;
  active: boolean;
  icon: React.ElementType;
}

export default function SidebarNavItem({
  href,
  label,
  active,
  icon: Icon,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />

      {label}
    </Link>
  );
}
