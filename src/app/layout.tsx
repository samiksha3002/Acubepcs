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
      <head>
        {/* ✅ Viewport meta tag to ensure responsive behavior */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      {/* ✅ overflow-x-hidden added to prevent horizontal scroll on mobile */}
      <body className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
