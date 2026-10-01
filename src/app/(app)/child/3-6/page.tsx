"use client";

import { useState } from "react";
import data from "@/content/child/3-6.json";

export default function ThreeToSixPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-lime-800">
          🧒 ۳-۶ سال
        </h1>
        <p className="text-sm text-gray-500">
          سال‌های پیش‌دبستانی
        </p>
      </header>

      <section className="space-y-3">
        {data.topics.map((topic) => {
          const isOpen = openId === topic.id;
          return (
            <div
              key={topic.id}
              className="bg-white rounded-2xl border border-lime-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : topic.id)}
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-lime-50/50 transition-colors"
              >
                <span className="text-2xl">{topic.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lime-900 text-sm">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-lime-700 mt-0.5">
                    {topic.preview}
                  </p>
                </div>
                <span
                  className={`text-lime-500 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ←
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-lime-100">
                  <p className="text-xs text-lime-800 leading-loose whitespace-pre-line">
                    {topic.body}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="bg-lime-50 rounded-2xl p-4 border border-lime-100 text-xs text-lime-700 leading-relaxed text-center">
        💕 این مرحله پر از کشف و شادیه.
      </div>
    </div>
  );
}