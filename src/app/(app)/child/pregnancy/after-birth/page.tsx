"use client";

import { useState } from "react";
import data from "@/content/child/pregnancy/after-birth.json";

export default function AfterBirthPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-violet-800">
          💜 بعد از زایمان
        </h1>
        <p className="text-sm text-gray-500">
          مراقبت از خودت، تو هم مهمی
        </p>
      </header>

      <section className="space-y-3">
        {data.topics.map((topic) => {
          const isOpen = openId === topic.id;
          return (
            <div
              key={topic.id}
              className="bg-white rounded-2xl border border-violet-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : topic.id)}
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-violet-50/50 transition-colors"
              >
                <span className="text-2xl">{topic.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-violet-900 text-sm">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-violet-500 mt-0.5">
                    {topic.preview}
                  </p>
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
                  <p className="text-xs text-violet-800 leading-loose whitespace-pre-line">
                    {topic.body}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="bg-violet-50 rounded-2xl p-4 border border-violet-100 text-xs text-violet-700 leading-relaxed text-center">
        💜 تو هم مهمی، نه فقط به عنوان مادر، بلکه به عنوان خودت.
      </div>
    </div>
  );
}