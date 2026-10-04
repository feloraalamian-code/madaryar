"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingChatButton() {
  const pathname = usePathname();

  // تو صفحه چت خودش نشون نده
  if (pathname === "/chat") return null;

  return (
    <Link
      href="/chat"
      className="fixed bottom-32 left-4 z-[60] w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 shadow-xl flex items-center justify-center hover:scale-110 transition-all active:scale-90"
      aria-label="چت با دستیار"
    >
      <span className="text-2xl">🤖</span>
      <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
    </Link>
  );
}