"use client";

import { useState } from "react";
import Link from "next/link";
import data from "@/content/home/cleaning/guide.json";

export default function GuidePage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-cyan-800">🧼 راهنمای تمیزی</h1>
        <p className="text-sm text-gray-500">چطور چی رو تمیز کنیم</p>
      </header>

      <Link
        href="/home/cleaning"
        className="text-xs text-cyan-600 flex items-center gap-1"
      >
        → برگشت به مأموریت
      </Link>

      <section className="space-y-3">
        {data.categories.map((cat: any) => {
          const isOpen = openId === cat.id;
          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-cyan-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : cat.id)}
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-cyan-50/50 transition-colors"
              >
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-bold text-cyan-900 text-sm flex-1">
                  {cat.title}
                </h3>
                <span
                  className={`text-cyan-400 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ←
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-cyan-100">
                  <ul className="space-y-2">
                    {cat.items.map((item: string, idx: number) => (
                      <li
                        key={idx}
                        className="text-xs text-cyan-800 flex items-start gap-2"
                      >
                        <span className="text-cyan-400">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="bg-cyan-50 rounded-2xl p-4 border border-cyan-100 text-xs text-cyan-600 text-center">
        💙 تمیزی، آرامش می‌آره
      </div>
    </div>
  );
}