"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function AdminDashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-xl font-bold">AcubePCS Admin</h1>
        <div className="cursor-pointer" onClick={() => setSidebarOpen(true)}>
          <Image
            src="/admin-avatar.png"
            alt="Admin"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6 overflow-y-auto">
          <div className="flex justify-end">
            <X
              size={30}
              className="cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            />
          </div>

          {/* Admin Info */}
          <div className="flex flex-col items-center mt-4">
            <Image
              src="/admin-avatar.png"
              alt="Admin Avatar"
              width={100}
              height={100}
              className="rounded-full"
            />
            <h2 className="mt-3 text-xl font-semibold">Admin</h2>
          </div>

          {/* Menu */}
          <div className="mt-10 space-y-6 text-center text-lg font-medium">
            <button
              className="w-full py-2 border rounded hover:bg-gray-200"
              onClick={() => {
                // navigate or highlight section
                setSidebarOpen(false);
                document.getElementById("investments")?.scrollIntoView();
              }}
            >
              ✅ Investment Approval
            </button>
            <button
              className="w-full py-2 border rounded hover:bg-gray-200"
              onClick={() => {
                setSidebarOpen(false);
                document.getElementById("withdraw")?.scrollIntoView();
              }}
            >
              💸 Withdraw Requests
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}
