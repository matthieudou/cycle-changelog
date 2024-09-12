import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Created by Matthieu for Cycle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans overflow-x-hidden">{children}</body>
    </html>
  );
}
