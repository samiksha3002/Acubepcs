import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PCS - Invest in Future Energy",
  description:
    "Smart investments in solar energy and electric vehicle charging.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">{children}</body>
    </html>
  );
}
