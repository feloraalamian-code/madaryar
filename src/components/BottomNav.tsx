"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/self-care",
    label: "آرامش من",
    emoji: "🌸",
  },
  {
    href: "/home",
    label: "خانه",
    emoji: "🏠",
  },
  {
    href: "/child",
    label: "کودک",
    emoji: "👶",
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200">
      <div className="max-w-md mx-auto grid grid-cols-3 gap-1 px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-2 rounded-2xl transition-all active:scale-95 ${
                isActive ? "bg-purple-50" : "hover:bg-gray-50"
              }`}
            >
              <span
                className={`text-2xl ${
                  isActive ? "scale-110" : ""
                } transition-transform`}
              >
                {item.emoji}
              </span>
              <span
                className={`text-[11px] font-medium ${
                  isActive ? "text-purple-600" : "text-gray-500"
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