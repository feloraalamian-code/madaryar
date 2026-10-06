"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Challenge = {
  id: string;
  icon: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  dailyActions: string[];
};

type ActiveChallenge = {
  id: string;
  completedDays: number[];
  startDate: string;
};

const challenges: Challenge[] = [
  {
    id: "self-7-days",
    icon: "🌿",
    title: "۷ روز برای خودم",
    description: "مادر هم مهمه. هر روز ۱۰ دقیقه فقط برای خودت.",
    duration: 7,
    category: "self",
    dailyActions: [
      "یه چای یا قهوه بریز و چند دقیقه تنها باش.",
      "به پوست یا موهات رسیدگی کن.",
      "یه موسیقی که دوست داری گوش بده.",
      "چند صفحه کتاب بخون.",
      "یه کار عقب‌افتاده که برای خودته انجام بده.",
      "استراحت کن، بدون احساس گناه.",
      "امروز کاری رو بکن که واقعاً دوست داری.",
    ],
  },
  {
    id: "calm-7-days",
    icon: "🧘",
    title: "۷ روز آرام‌تر",
    description: "مادر آروم، خانواده آروم. هر روز ۵ دقیقه آرام‌سازی.",
    duration: 7,
    category: "self",
    dailyActions: [
      "وقتی عصبانی شدی، قبل از جواب دادن مکث کن.",
      "۵ دقیقه تنفس آرام.",
      "یه کار رو بدون عجله انجام بده.",
      "وقتی صدا بالا رفت، مکث و دوباره شروع کن.",
      "۱۰ دقیقه بدون موبایل.",
      "یه «نه» بدون توضیح اضافه.",
      "ببین این هفته چی آرام‌ترت کرد.",
    ],
  },
  {
    id: "child-7-days",
    icon: "💜",
    title: "۷ روز ارتباط با کودک",
    description: "هر روز ۱۰ دقیقه ارتباط باکیفیت با کودک.",
    duration: 7,
    category: "child",
    dailyActions: [
      "بازی‌ای که خودش انتخاب می‌کنه.",
      "۱۰ دقیقه فقط به حرفاش گوش بده.",
      "با هم یه کتاب بخونید.",
      "بپرس: «امروز چی بیشتر خوشحالت کرد؟»",
      "با هم یه کار ساده در خونه انجام بدید.",
      "بازی خنده‌دار و بی‌قانون.",
      "۱۰ دقیقه در آغوش گرفتن.",
    ],
  },
];

export default function ChallengesPage() {
  const [activeChallenge, setActiveChallenge] =
    useLocalStorage<ActiveChallenge | null>("active-challenge", null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const startChallenge = (challenge: Challenge) => {
    setActiveChallenge({
      id: challenge.id,
      completedDays: [],
      startDate: new Date().toLocaleDateString("fa-IR"),
    });
  };

  const completeToday = () => {
    if (!activeChallenge) return;
    const challenge = challenges.find((c) => c.id === activeChallenge.id);
    if (!challenge) return;

    const nextDay = activeChallenge.completedDays.length + 1;
    if (nextDay > challenge.duration) return;

    setActiveChallenge({
      ...activeChallenge,
      completedDays: [...activeChallenge.completedDays, nextDay],
    });
  };

  const resetChallenge = () => {
    setActiveChallenge(null);
  };

  if (!isLoaded) return null;

  const active = activeChallenge
    ? challenges.find((c) => c.id === activeChallenge.id)
    : null;

  const currentDay = activeChallenge
    ? activeChallenge.completedDays.length + 1
    : 0;

  const isCompleted =
    active && activeChallenge
      ? activeChallenge.completedDays.length >= active.duration
      : false;

  return (
    <div className="space-y-4 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-amber-800">🎯 چالش‌ها</h1>
        <p className="text-sm text-gray-500">
          یک قدم کوچک برای حال بهترت
        </p>
      </header>

      <Link
        href="/me"
        className="text-xs text-amber-600 flex items-center gap-1"
      >
        → برگشت
      </Link>

      {/* چالش فعال */}
      {active && activeChallenge && !isCompleted && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200 shadow-md">
          <div className="text-center space-y-3 mb-5">
            <div className="text-5xl">{active.icon}</div>
            <h2 className="text-xl font-bold text-amber-900">
              {active.title}
            </h2>
            <p className="text-xs text-amber-600">
              روز {currentDay} از {active.duration}
            </p>
          </div>

          <div className="bg-white/70 rounded-2xl p-4 mb-4">
            <p className="text-[10px] text-amber-600 font-bold mb-2">
              🎯 کار امروز:
            </p>
            <p className="text-sm text-amber-900 leading-relaxed">
              {active.dailyActions[currentDay - 1]}
            </p>
          </div>

          {/* پیشرفت */}
          <div className="flex gap-1.5 mb-5">
            {Array.from({ length: active.duration }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full transition-all ${
                  idx < activeChallenge.completedDays.length
                    ? "bg-amber-500"
                    : "bg-amber-200"
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={completeToday}
              className="bg-gradient-to-l from-amber-500 to-orange-500 text-white font-bold py-3 rounded-2xl active:scale-95 transition-all"
            >
              ✅ انجام دادم
            </button>
            <button
              onClick={resetChallenge}
              className="bg-white text-amber-600 border border-amber-200 font-bold py-3 rounded-2xl active:scale-95 transition-all"
            >
              🔄 ریست
            </button>
          </div>
        </div>
      )}

      {/* چالش تکمیل شده */}
      {active && activeChallenge && isCompleted && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200 shadow-md text-center">
          <div className="text-6xl mb-3">🎉</div>
          <h2 className="text-xl font-bold text-green-800 mb-2">
            چالش رو کامل کردی!
          </h2>
          <p className="text-sm text-green-600 mb-5">
            {active.duration} روز را پشت سر گذاشتی. آفرین بهت 🌿
          </p>
          <button
            onClick={resetChallenge}
            className="w-full bg-gradient-to-l from-green-500 to-emerald-500 text-white font-bold py-3 rounded-2xl active:scale-95 transition-all"
          >
            🎯 چالش جدید
          </button>
        </div>
      )}

      {/* لیست چالش‌ها */}
      {!activeChallenge && (
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-gray-700 px-1">
            چالش‌های موجود
          </h2>

          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-3xl border border-amber-100 p-5 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="text-4xl">{challenge.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-amber-900">
                    {challenge.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => startChallenge(challenge)}
                className="w-full bg-gradient-to-l from-amber-500 to-orange-500 text-white font-bold py-3 rounded-2xl active:scale-95 transition-all"
              >
                🚀 شروع چالش
              </button>
            </div>
          ))}
        </section>
      )}

      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-xs text-amber-600 text-center">
        💛 یک قدم کوچک، یه تغییر بزرگ
      </div>
    </div>
  );
}