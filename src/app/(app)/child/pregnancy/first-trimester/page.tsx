"use client";

import { useState } from "react";
import data from "@/content/child/pregnancy/first-trimester.json";

export default function FirstTrimesterPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-pink-800">
          🌸 سه ماهه اول
        </h1>
        <p className="text-sm text-gray-500">
          هفته ۱ تا ۱۳
        </p>
      </header>

      <section className="space-y-3">
        {data.topics.map((topic) => {
          const isOpen = openId === topic.id;
          return (
            <div
              key={topic.id}
              className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : topic.id)}
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-pink-50/50 transition-colors"
              >
                <span className="text-2xl">{topic.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-pink-900 text-sm">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-pink-500 mt-0.5">
                    {topic.preview}
                  </p>
                </div>
                <span
                  className={`text-pink-400 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ←
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-pink-100">
                  <p className="text-xs text-pink-800 leading-loose whitespace-pre-line">
                    {topic.body}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 text-xs text-pink-600 leading-relaxed text-center">
        💕 مراقب خودت باش.
      </div>
    </div>
  );
}