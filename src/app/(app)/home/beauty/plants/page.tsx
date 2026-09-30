"use client";

import { useState } from "react";
import data from "@/content/home/beauty/plants.json";

export default function PlantsPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-lime-800">
          🌱 گیاه‌ها
        </h1>
        <p className="text-sm text-gray-500">
          ۱۰ گیاه آپارتمانی
        </p>
      </header>

      <section className="space-y-3">
        {data.plants.map((plant) => {
          const isOpen = openId === plant.id;
          return (
            <div
              key={plant.id}
              className="bg-white rounded-2xl border border-lime-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : plant.id)}
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-lime-50/50 transition-colors"
              >
                <span className="text-2xl">{plant.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lime-900 text-sm">
                    {plant.name}
                  </h3>
                  <p className="text-xs text-lime-600 mt-0.5">
                    {plant.difficulty} • {plant.light} • {plant.water}
                  </p>
                </div>
                <span
                  className={`text-lime-400 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ←
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-lime-100">
                  <p className="text-xs text-lime-800 leading-loose whitespace-pre-line">
                    {plant.body}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="bg-lime-50 rounded-2xl p-4 border border-lime-100">
        <h3 className="text-xs font-bold text-lime-800 mb-3">
          💡 نکات کلی
        </h3>
        <ul className="space-y-2">
          {data.generalTips.map((tip, index) => (
            <li key={index} className="text-xs text-lime-700">
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}