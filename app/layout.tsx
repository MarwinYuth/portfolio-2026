import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marwin Yuth",
  description: "Portfolio — 2026",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
