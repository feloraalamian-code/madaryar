import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مادریار",
  description: "همراه تو در مسیر مادر بودن",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}