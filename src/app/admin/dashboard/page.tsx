import { useState } from "react";
import { ReactNode } from "react";
import Image from "next/image";

interface AdminDashboardLayoutProps {
  children: ReactNode;
}

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Your actual sidebar + layout UI */}
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {children}
      </div>
    </div>
  );
}
