"use client";

import { useState } from "react";
import data from "@/content/home/beauty/feeling.json";

export default function FeelingPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-teal-800">
          🏡 حس خانه
        </h1>
        <p className="text-sm text-gray-500">
          ۱۲ راز برای خونه‌ی دلنشین
        </p>
      </header>

      <section className="space-y-3">
        {data.tips.map((tip) => {
          const isOpen = openId === tip.id;
          return (
            <div
              key={tip.id}
              className="bg-white rounded-2xl border border-teal-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : tip.id)}
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-teal-50/50 transition-colors"
              >
                <span className="text-2xl">{tip.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-teal-900 text-sm">
                    {tip.title}
                  </h3>
                </div>
                <span
                  className={`text-teal-400 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ←
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-teal-100">
                  <p className="text-xs text-teal-800 leading-loose whitespace-pre-line">
                    {tip.body}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100 text-xs text-teal-600 leading-relaxed text-center">
        💙 خونه‌ات، پناهگاه توست.
      </div>
    </div>
  );
}