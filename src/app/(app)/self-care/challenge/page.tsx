"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import challengesData from "@/content/self-care/challenges.json";

type Challenge = {
  id: string;
  icon: string;
  title: string;
  description: string;
  dailyActions: string[];
  category: string;
};

type ActiveChallenge = {
  id: string;
  completedDays: number[];
  startedAt: string;
};

const challenges: Challenge[] = challengesData.challenges;

export default function ChallengePage() {
  const [activeChallenge, setActiveChallenge] = useState<ActiveChallenge | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("madaryar_active_challenge");
    if (saved) {
      try {
        setActiveChallenge(JSON.parse(saved));
      } catch (e) {
        console.error("خطا در خواندن چالش:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const startChallenge = (challenge: Challenge) => {
    const data: ActiveChallenge = {
      id: challenge.id,
      completedDays: [],
      startedAt: new Date().toISOString(),
    };
    localStorage.setItem("madaryar_active_challenge", JSON.stringify(data));
    setActiveChallenge(data);
  };

  const completeToday = () => {
    if (!activeChallenge) return;
    const nextDay = activeChallenge.completedDays.length + 1;
    if (nextDay > 7) return;

    const updated: ActiveChallenge = {
      ...activeChallenge,
      completedDays: [...activeChallenge.completedDays, nextDay],
    };
    localStorage.setItem("madaryar_active_challenge", JSON.stringify(updated));
    setActiveChallenge(updated);
  };

  const resetChallenge = () => {
    localStorage.removeItem("madaryar_active_challenge");
    setActiveChallenge(null);
  };

  const active = challenges.find((c) => c.id === activeChallenge?.id);
  const currentDay = activeChallenge
    ? activeChallenge.completedDays.length + 1
    : 1;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-pink-500">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 pb-8">
      <div className="max-w-md mx-auto px-4 pt-4">
        {/* هدر */}
        <header className="mb-6">
          <Link
            href="/self-care"
            className="text-sm text-gray-500 mb-4 inline-block"
          >
            → برگشت
          </Link>
          <div className="text-4xl mb-2">🌱</div>
          <h1 className="text-2xl font-bold text-gray-800">
            چالش‌های من
          </h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            خودت رو به چالش بکش، رشد کن.
          </p>
        </header>

        {/* چالش فعال */}
        {active && activeChallenge && activeChallenge.completedDays.length < 7 && (
          <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm border border-pink-100">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-3xl">{active.icon}</span>
              <div>
                <h2 className="font-bold text-gray-800">{active.title}</h2>
                <p className="mt-1 text-xs text-gray-500">
                  روز {currentDay} از ۷
                </p>
              </div>
            </div>

            <p className="mb-6 text-base leading-8 text-gray-700">
              {active.dailyActions[activeChallenge.completedDays.length]}
            </p>

            <div className="mb-5 flex gap-1.5">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full ${
                    index < activeChallenge.completedDays.length
                      ? "bg-green-600"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={completeToday}
              className="w-full rounded-2xl bg-green-600 py-3.5 font-bold text-white active:scale-[0.98] transition-all"
            >
              انجام دادم ✓
            </button>
          </div>
        )}

        {/* چالش کامل شده */}
        {active && activeChallenge && activeChallenge.completedDays.length === 7 && (
          <div className="mb-6 rounded-3xl bg-white p-7 text-center shadow-sm border border-green-200">
            <div className="mb-3 text-5xl">🎉</div>
            <h2 className="font-bold text-gray-800 text-lg">
              چالش رو کامل کردی!
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              ۷ روز رو پشت سر گذاشتی. آفرین بهت 🌿
            </p>
            <p className="mt-2 text-xs text-pink-600">
              💜 تو لایق اینی
            </p>

            <button
              onClick={resetChallenge}
              className="mt-5 w-full rounded-2xl bg-pink-500 py-3 font-bold text-white active:scale-[0.98] transition-all"
            >
              🎯 چالش جدید
            </button>
          </div>
        )}

        {/* لیست چالش‌ها */}
        {(!activeChallenge || activeChallenge.completedDays.length === 7) && (
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100"
              >
                <div className="mb-4 flex items-start gap-3">
                  <span className="text-3xl">{challenge.icon}</span>
                  <div className="flex-1">
                    <h2 className="font-bold text-gray-800">
                      {challenge.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      {challenge.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => startChallenge(challenge)}
                  className="w-full rounded-2xl border-2 border-green-600 py-3 text-sm font-bold text-green-700 hover:bg-green-50 active:scale-[0.98] transition-all"
                >
                  شروع چالش
                </button>
              </div>
            ))}
          </div>
        )}

        {/* فوتر */}
        <div className="mt-6 bg-pink-50 rounded-2xl p-4 border border-pink-100 text-xs text-pink-600 leading-relaxed text-center">
          💜 هر چالش، یه قدم به خودت نزدیک‌ترت می‌کنه
        </div>
      </div>
    </div>
  );
}