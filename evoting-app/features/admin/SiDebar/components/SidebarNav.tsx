"use client";
import { usePathname } from "next/navigation";
import { BarChart3, ClipboardList, Home, Map, Users } from "lucide-react";
import SidebarNavItem from "./SidebarNavItem";
import type { Role } from "../types";

interface Props {
  role: Role;
}

export default function SidebarNav({ role }: Props) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: Home,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },

    {
      href: "/admin/kandidat",
      label: "Kandidat",
      icon: Users,
      roles: ["SUPER_ADMIN"],
    },

    {
      href: "/admin/pemilih",
      label: "Pemilih",
      icon: ClipboardList,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },

    {
      href: "/admin/wilayah",
      label: "Wilayah",
      icon: Map,
      roles: ["SUPER_ADMIN"],
    },

    {
      href: "/admin/statistik",
      label: "Statistik",
      icon: BarChart3,
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
  ];

  return (
    <nav
      className="
        flex-1
        space-y-0.5
        overflow-y-auto
        px-3
        py-2
      "
    >
      {navItems

        .filter((item) => item.roles.includes(role))

        .map((item) => (
          <SidebarNavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={
              pathname === item.href || pathname.startsWith(`${item.href}/`)
            }
          />
        ))}
    </nav>
  );
}
