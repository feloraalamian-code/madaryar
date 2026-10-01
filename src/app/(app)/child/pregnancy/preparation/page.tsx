"use client";

import { useState } from "react";
import data from "@/content/child/pregnancy/preparation.json";

export default function PreparationPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-amber-800">
          👶 آماده‌سازی زایمان
        </h1>
        <p className="text-sm text-gray-500">
          برای روز موعود آماده شو
        </p>
      </header>

      <section className="space-y-3">
        {data.topics.map((topic) => {
          const isOpen = openId === topic.id;
          return (
            <div
              key={topic.id}
              className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : topic.id)}
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-amber-50/50 transition-colors"
              >
                <span className="text-2xl">{topic.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-amber-900 text-sm">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-amber-600 mt-0.5">
                    {topic.preview}
                  </p>
                </div>
                <span
                  className={`text-amber-400 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ←
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-amber-100">
                  <p className="text-xs text-amber-800 leading-loose whitespace-pre-line">
                    {topic.body}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-xs text-amber-700 leading-relaxed text-center">
        💕 کم مونده به دیدنش.
      </div>
    </div>
  );
}