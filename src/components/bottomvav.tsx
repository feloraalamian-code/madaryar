"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/self-care", label: "خودم", emoji: "💜" },
  { href: "/home", label: "خانه", emoji: "🏠" },
  { href: "/child", label: "کودک", emoji: "👶" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-1 px-2 py-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-2 rounded-2xl transition-all active:scale-95 ${
                isActive
                  ? "bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-950/50 dark:to-purple-950/50"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <span
                className={`text-xl ${isActive ? "scale-110" : ""} transition-transform`}
              >
                {item.emoji}
              </span>
              <span
                className={`text-[10px] font-medium ${
                  isActive
                    ? "text-pink-700 dark:text-pink-300"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}