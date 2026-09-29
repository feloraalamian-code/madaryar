"use client";

import { useState } from "react";
import giftsData from "@/content/self-care/gifts.json";
import challengesData from "@/content/self-care/challenges.json";
import contentsData from "@/content/self-care/contents.json";

export default function SelfCarePage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const todayIndex =
    Math.floor(Date.now() / (1000 * 60 * 60 * 24)) %
    Math.max(giftsData.gifts.length, challengesData.challenges.length);

  const todayGift = giftsData.gifts[todayIndex % giftsData.gifts.length];
  const todayChallenge =
    challengesData.challenges[todayIndex % challengesData.challenges.length];

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4">
        <h1 className="text-2xl font-bold text-purple-800">برای خودم</h1>
        <p className="text-sm text-gray-500 mt-1">چند لحظه فقط برای تو</p>
      </header>

      {/* جعبه هدیه */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 shadow-sm">
        <div className="text-center space-y-4">
          <div className="text-5xl">🎁</div>
          <h2 className="text-sm font-medium text-purple-600">هدیه امروز</h2>
          <p className="text-base text-purple-900 leading-relaxed px-2">
            {todayGift.text}
          </p>
        </div>
      </section>

      {/* چالش روزانه */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="text-4xl">{todayChallenge.icon}</div>
          <div className="flex-1">
            <h2 className="text-sm font-medium text-blue-600 mb-2">
              چالش امروز
            </h2>
            <p className="text-base text-blue-900 leading-relaxed">
              {todayChallenge.text}
            </p>
          </div>
        </div>
      </section>

      {/* برای لحظه‌های سخت */}
      <section className="space-y-3">
        <div className="flex items-center gap-3 px-1">
          <span className="text-2xl">💜</span>
          <h2 className="text-lg font-bold text-gray-800">
            برای لحظه‌های سخت
          </h2>
        </div>

        {contentsData.contents.map((content) => {
          const isOpen = openId === content.id;
          return (
            <div
              key={content.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : content.id)}
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-gray-50 transition-colors"
              >
                <span className="text-2xl">{content.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-sm">
                    {content.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {content.preview}
                  </p>
                </div>
                <span
                  className={`text-gray-400 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ←
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                  <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                    {content.body}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 text-xs text-purple-600 leading-relaxed">
        💜 این بخش برای حمایت از توست، نه جایگزین کمک تخصصی.
      </div>
    </div>
  );
}