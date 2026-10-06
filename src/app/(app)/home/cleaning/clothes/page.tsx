"use client";

import { useState } from "react";
import Link from "next/link";
import data from "@/content/home/cleaning/clothes.json";

export default function ClothesPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-cyan-800">👕 لباس‌ها</h1>
        <p className="text-sm text-gray-500">شستن، اتو و مرتب کردن</p>
      </header>

      <Link
        href="/home/cleaning"
        className="text-xs text-cyan-600 flex items-center gap-1"
      >
        → برگشت به مأموریت
      </Link>

      <section className="space-y-3">
        {data.sections.map((section: any) => {
          const isOpen = openId === section.id;
          return (
            <div
              key={section.id}
              className="bg-white rounded-2xl border border-cyan-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : section.id)}
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-cyan-50/50 transition-colors"
              >
                <span className="text-2xl">{section.icon}</span>
                <h3 className="font-bold text-cyan-900 text-sm flex-1">
                  {section.title}
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
                    {section.items.map((item: string, idx: number) => (
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
        💙 لباس‌های مرتب، حال خوب
      </div>
    </div>
  );
}