"use client";

import { useState } from "react";
import data from "@/content/home/cleaning/clothes.json";

export default function ClothesPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-violet-800">
          👕 لباس‌ها
        </h1>
        <p className="text-sm text-gray-500">
          شستن، اتو و مرتب کردن
        </p>
      </header>

      <section className="space-y-3">
        {data.sections.map((section) => {
          const isOpen = openId === section.id;
          return (
            <div
              key={section.id}
              className="bg-white rounded-2xl border border-violet-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : section.id)}
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-violet-50/50 transition-colors"
              >
                <span className="text-2xl">{section.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-violet-900">
                    {section.title}
                  </h3>
                </div>
                <span
                  className={`text-violet-400 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ←
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-violet-100">
                  <ul className="space-y-2">
                    {section.items.map((item, index) => (
                      <li
                        key={index}
                        className="text-sm text-violet-800 flex items-start gap-2"
                      >
                        <span className="text-violet-400">▸</span>
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

      <div className="bg-violet-50 rounded-2xl p-4 border border-violet-100 text-xs text-violet-600 leading-relaxed text-center">
        💜 لباس مرتب، ذهن مرتب.
      </div>
    </div>
  );
}