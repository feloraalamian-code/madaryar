import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "مادریار",
  description: "همراه تو در مسیر مادر بودن",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      {
        url: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: "/icons/icon-192.png",
  },
  applicationName: "مادریار",
  themeColor: "#d98db8",
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