import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/utils/classNames";

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
      <body className={cn('antialiased')}>
        {children}
      </body>
    </html>
  );
}
