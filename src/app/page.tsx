"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Challenge = {
  id: string;
  title: string;
  emoji: string;
  duration: number;
  dailyAction: string;
  category: string;
};

export default function HomePage() {
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeChallenge] = useLocalStorage<Challenge | null>(
    "active-challenge",
    null
  );

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("صبح بخیر");
    else if (hour < 17) setGreeting("ظهر بخیر");
    else if (hour < 20) setGreeting("عصر بخیر");
    else setGreeting("شب بخیر");

    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="space-y-4 pb-8">
      {/* هدر بنر - محدود به کادر */}
      <div className="relative w-full h-28 rounded-2xl overflow-hidden shadow-md bg-gradient-to-l from-pink-400 to-purple-400">
        <Image
          src="/header-banner.png"
          alt="مادریار"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* سلام */}
      <div className="text-center space-y-1">
        <h1 className="text-lg font-bold text-pink-800">
          {greeting} {userName || "مامان"}! 👋
        </h1>
        <p className="text-xs text-gray-500">
          امروز چطور می‌تونم کمکت کنم؟
        </p>
      </div>

      {/* ۱. محتوا */}
      <section className="space-y-2">
        <h2 className="text-xs font-bold text-gray-700 px-1">📚 محتوا</h2>

        <div className="grid grid-cols-3 gap-2">
          <Link
            href="/self-care"
            className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-3 text-center shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mx-auto mb-2">
              <span className="text-xl">🌸</span>
            </div>
            <h3 className="text-[11px] font-bold text-purple-800">
              آرامش من
            </h3>
          </Link>

          <Link
            href="/home"
            className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-2xl p-3 text-center shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mx-auto mb-2">
              <span className="text-xl">🏠</span>
            </div>
            <h3 className="text-[11px] font-bold text-cyan-800">خانه</h3>
          </Link>

          <Link
            href="/child"
            className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-100 rounded-2xl p-3 text-center shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mx-auto mb-2">
              <span className="text-xl">👶</span>
            </div>
            <h3 className="text-[11px] font-bold text-pink-800">کودک</h3>
          </Link>
        </div>
      </section>

      {/* ۲. مادریار من */}
      <section className="space-y-2">
        <h2 className="text-xs font-bold text-gray-700 px-1">
          👩‍👧 مادریار من
        </h2>

        <div className="bg-white rounded-2xl border border-violet-100 p-3 shadow-sm">
          <div className="grid grid-cols-4 gap-2">
            <Link
              href="/me/child"
              className="bg-violet-50 rounded-xl p-2 text-center hover:bg-violet-100 transition-all active:scale-95"
            >
              <div className="text-xl mb-1">👧</div>
              <p className="text-[9px] font-bold text-violet-800">
                کودک من
              </p>
            </Link>

            <Link
              href="/child/growth"
              className="bg-pink-50 rounded-xl p-2 text-center hover:bg-pink-100 transition-all active:scale-95"
            >
              <div className="text-xl mb-1">📊</div>
              <p className="text-[9px] font-bold text-pink-800">
                گهواره
              </p>
            </Link>

            <Link
              href="/me/reminders"
              className="bg-cyan-50 rounded-xl p-2 text-center hover:bg-cyan-100 transition-all active:scale-95"
            >
              <div className="text-xl mb-1">🔔</div>
              <p className="text-[9px] font-bold text-cyan-800">
                یادآورها
              </p>
            </Link>

            <Link
              href="/me/challenges"
              className="bg-amber-50 rounded-xl p-2 text-center hover:bg-amber-100 transition-all active:scale-95"
            >
              <div className="text-xl mb-1">🎯</div>
              <p className="text-[9px] font-bold text-amber-800">
                چالش‌ها
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ۳. دستیار هوشمند */}
      <section className="space-y-2">
        <h2 className="text-xs font-bold text-gray-700 px-1">
          🤖 دستیار هوشمند
        </h2>

        <Link
          href="/chat"
          className="block rounded-2xl bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 border border-purple-200 p-4 shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
              <span className="text-2xl">🤖</span>
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-sm font-bold text-purple-900">
                جواب دغدغه‌هات رو می‌ده
              </h3>
              <p className="text-[10px] text-purple-700 mt-0.5">
                هر سوالی داری بپرس
              </p>
            </div>
            <span className="text-purple-400 text-lg">←</span>
          </div>
        </Link>
      </section>

      {/* ۴. چالش فعال */}
      {activeChallenge && (
        <section className="space-y-2">
          <h2 className="text-xs font-bold text-gray-700 px-1">
            🎯 چالش فعال
          </h2>

          <Link
            href="/me/challenges"
            className="block rounded-2xl bg-gradient-to-l from-amber-100 to-orange-100 border border-amber-200 p-3 shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{activeChallenge.emoji}</span>
              <div className="flex-1 text-right">
                <h3 className="text-sm font-bold text-amber-900">
                  {activeChallenge.title}
                </h3>
                <p className="text-[10px] text-amber-700 mt-0.5">
                  {activeChallenge.duration} روز
                </p>
              </div>
              <span className="text-amber-400 text-lg">←</span>
            </div>
          </Link>
        </section>
      )}

      {/* فوتر */}
      <div className="bg-pink-50 rounded-2xl p-3 border border-pink-100 text-[10px] text-pink-600 text-center">
        💕 همراه تو در مسیر مادر بودن
      </div>
    </div>
  );
}