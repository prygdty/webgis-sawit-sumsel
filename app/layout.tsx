import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Geo Sawit | Sumatera Selatan",
  description: "Sistem Informasi Geografis Kelapa Sawit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased">
        {/* Semua logika letak Sidebar & Header sekarang diurus oleh LayoutWrapper */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}