import { useState } from "react";
import { ReactNode } from "react";
import Image from "next/image";

// ✅ Define type for props
interface AdminDashboardLayoutProps {
  children: ReactNode;
}

// ✅ Use type in function argument
export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* Example Layout UI */}
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {children}
      </div>
    </div>
  );
}
