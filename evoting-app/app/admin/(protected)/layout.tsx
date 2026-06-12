import { getAuthPayload } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import AdminTopbar from "@/components/admin/Topbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = await getAuthPayload();
  if (!payload) redirect("/admin/login");

  return (
    <div className="flex h-screen overflow-hidden bg-secondary/30">
      <AdminSidebar role={payload.role as "ADMIN" | "PANITIA" | "SAKSI"} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopbar
          name={payload.name}
          role={payload.role as "ADMIN" | "PANITIA" | "SAKSI"}
        />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
