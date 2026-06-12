"use client";

export default function SidebarHeader() {
  return (
    <div className="h-16 flex items-center gap-3 px-5 border-b">
      <div className="w-8 h-8 bg-primary rounded-lg flex-center text-white font-bold text-sm">
        🗳
      </div>

      <span className="font-bold text-lg">E-VOTIS</span>
    </div>
  );
}
