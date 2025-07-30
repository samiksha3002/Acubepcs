import "../globals.css";
import type { Metadata } from "next";
import LoadingProvider from "@/components/loading-provider";

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
    <html lang="en" className="overflow-x-hidden">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}
