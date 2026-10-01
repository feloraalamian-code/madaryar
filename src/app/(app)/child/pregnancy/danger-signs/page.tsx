"use client";

import { useState } from "react";
import data from "@/content/child/pregnancy/danger-signs.json";

export default function DangerSignsPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-red-800">
          ⚠️ علائم خطر بارداری
        </h1>
        <p className="text-sm text-gray-500">
          این علائم رو جدی بگیر
        </p>
      </header>

      {/* کادر قرمز هشدار */}
      <div className="bg-red-50 rounded-2xl p-4 border border-red-200 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🆘</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-red-800 mb-1">
              اگه علائم شدید داشتی، سریع به بیمارستان برو
            </p>
            <p className="text-xs text-red-600 leading-relaxed">
              این اطلاعات عمومی و آموزشی است. برای تشخیص و درمان، حتماً به
              پزشک مراجعه کن.
            </p>
          </div>
        </div>
      </div>

      {/* علائم */}
      <section className="space-y-3">
        {data.signs.map((sign) => {
          const isOpen = openId === sign.id;
          return (
            <div
              key={sign.id}
              className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : sign.id)}
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-red-50/50 transition-colors"
              >
                <span className="text-2xl">{sign.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-red-900 text-sm">
                    {sign.title}
                  </h3>
                </div>
                <span
                  className={`text-red-400 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ←
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-red-100">
                  <p className="text-xs text-red-800 leading-loose whitespace-pre-line">
                    {sign.body}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="bg-red-50 rounded-2xl p-4 border border-red-200 text-xs text-red-700 leading-relaxed text-center font-medium">
        🆘 تو مهمی. خودت و بچه‌ت رو جدی بگیر.
      </div>
    </div>
  );
}