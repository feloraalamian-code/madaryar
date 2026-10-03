"use client";

import { useState } from "react";
import data from "@/content/child/pregnancy/birth.json";

export default function BirthPage() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-cyan-800">
          🏥 زایمان
        </h1>
        <p className="text-sm text-gray-500">
          آماده برای روز موعود
        </p>
      </header>

      <section className="space-y-3">
        {data.topics.map((topic) => {
          const isOpen = openId === topic.id;
          const isExpanded = expandedId === topic.id;
          const isLong = topic.body.length > 200;

          return (
            <div
              key={topic.id}
              className="bg-white rounded-2xl border border-cyan-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : topic.id)}
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-cyan-50/50 transition-colors"
              >
                <span className="text-2xl">{topic.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-cyan-900 text-sm">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-cyan-500 mt-0.5">
                    {topic.preview}
                  </p>
                </div>
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
                  {/* متن با محدودیت ارتفاع */}
                  <div
                    className={`relative text-xs text-cyan-800 leading-loose whitespace-pre-line transition-all ${
                      !isExpanded && isLong ? "max-h-40 overflow-hidden" : ""
                    }`}
                  >
                    {topic.body}

                    {/* گرادیان محو شدن */}
                    {!isExpanded && isLong && (
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
                    )}
                  </div>

                  {/* دکمه ادامه مطلب */}
                  {isLong && (
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : topic.id)
                      }
                      className="mt-3 text-xs font-semibold text-cyan-600 hover:text-cyan-800 transition-colors"
                    >
                      {isExpanded ? "↑ بستن" : "↓ ادامه مطلب"}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="bg-cyan-50 rounded-2xl p-4 border border-cyan-100 text-xs text-cyan-700 leading-relaxed text-center">
        💕 تو می‌تونی. تو قوی هستی.
      </div>
    </div>
  );
}