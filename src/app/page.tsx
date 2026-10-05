"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { allContent } from "@/content/allContent";

const sections = [
  {
    href: "/self-care",
    title: "آرامش من",
    description: "به خودت هم اهمیت بده",
    emoji: "🌸",
    bgColor: "bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50",
    borderColor: "border-purple-100",
    textColor: "text-purple-800",
    descColor: "text-purple-500",
  },
  {
    href: "/home",
    title: "خانه",
    description: "آشپزی، تمیزی و زیبایی",
    emoji: "🏠",
    bgColor: "bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50",
    borderColor: "border-sky-100",
    textColor: "text-sky-800",
    descColor: "text-sky-500",
  },
  {
    href: "/child",
    title: "کودک",
    description: "از بارداری تا نوجوانی",
    emoji: "👶",
    bgColor: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50",
    borderColor: "border-amber-100",
    textColor: "text-amber-800",
    descColor: "text-amber-500",
  },
];

const dailyTips = [
  {
    emoji: "🌸",
    text: "امروز ۵ دقیقه فقط برای خودت وقت بذار",
    link: "/self-care",
  },
  {
    emoji: "👶",
    text: "با بچه‌ت یه بازی ساده انجام بده",
    link: "/child",
  },
  {
    emoji: "💜",
    text: "به خودت یه تعریف قشنگ بگو",
    link: "/self-care/heart",
  },
  {
    emoji: "📚",
    text: "یه صفحه از یه کتاب تربیتی بخون",
    link: "/child/books",
  },
  {
    emoji: "🍳",
    text: "یه غذای ساده و خوشمزه درست کن",
    link: "/home/cooking",
  },
  {
    emoji: "🧘",
    text: "۵ دقیقه تمرین تنفس انجام بده",
    link: "/self-care/breathing",
  },
];

export default function MainPage() {
  const [search, setSearch] = useState("");
  const [tip, setTip] = useState(dailyTips[0]);
  const [greeting, setGreeting] = useState("سلام مامان!");
  const [stats] = useState({
    articles: 5,
    exercises: 3,
    recipes: 7,
  });

  useEffect(() => {
    const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
    setTip(randomTip);

    const hour = new Date().getHours();
    if (hour < 12) setGreeting("صبح بخیر مامان! 🌸");
    else if (hour < 17) setGreeting("ظهر بخیر مامان! ☀️");
    else if (hour < 20) setGreeting("عصر بخیر مامان! 🌆");
    else setGreeting("شب بخیر مامان! 🌙");
  }, []);

  const filteredSections = sections.filter(
    (s) => s.title.includes(search) || s.description.includes(search)
  );

  const searchResults =
    search.trim().length > 0
      ? allContent.filter(
          (item) =>
            item.title.includes(search) || item.preview.includes(search)
        )
      : [];

  const isSearching = search.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 pb-8">
      <div className="max-w-md mx-auto px-4">
        {/* هدر */}
        <header className="relative bg-gradient-to-br from-pink-400 via-rose-400 to-purple-400 rounded-3xl px-5 py-5 mt-4 shadow-md overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-6 -mb-6" />
          <div className="relative">
            <h1 className="text-xl font-bold text-white drop-shadow-sm">
              مادریار 🌸
            </h1>
            <p className="text-[10px] text-white/85 mt-0.5">
              همراه تو در مسیر مادر بودن
            </p>
            <p className="text-xs text-white/95 mt-3 font-medium">
              {greeting}
            </p>
          </div>
        </header>

        {/* آمار */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 mt-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-purple-600">
                {stats.articles}
              </div>
              <div className="text-[9px] text-gray-500">📚 مقاله</div>
            </div>
            <div className="border-x border-gray-100">
              <div className="text-lg font-bold text-pink-600">
                {stats.exercises}
              </div>
              <div className="text-[9px] text-gray-500">🧘 تمرین</div>
            </div>
            <div>
              <div className="text-lg font-bold text-amber-600">
                {stats.recipes}
              </div>
              <div className="text-[9px] text-gray-500">🍳 غذا</div>
            </div>
          </div>
        </div>

        {/* جستجو */}
        <div className="relative mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 جستجو در همه محتوا..."
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-pink-300 transition-colors"
          />
          {isSearching && (
            <button
              onClick={() => setSearch("")}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
            >
              ✕
            </button>
          )}
        </div>

        {isSearching ? (
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-3 px-1">
              {searchResults.length > 0
                ? `${searchResults.length} نتیجه پیدا شد`
                : "چیزی پیدا نشد 🤷‍♀️"}
            </p>
            <div className="space-y-2">
              {searchResults.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  className="block bg-white rounded-2xl border border-gray-100 p-3 shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm text-gray-800">
                          {item.title}
                        </h3>
                        <span className="text-[9px] bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.preview}
                      </p>
                    </div>
                    <span className="text-gray-400 text-sm">←</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mt-4">
              <Link
                href={tip.link}
                className="block bg-gradient-to-l from-pink-100 via-rose-100 to-purple-100 border border-pink-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tip.emoji}</span>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold text-pink-600 mb-1">
                      ✨ پیشنهاد امروز
                    </p>
                    <p className="text-xs text-pink-800 leading-relaxed">
                      {tip.text}
                    </p>
                  </div>
                  <span className="text-pink-400 text-xl">←</span>
                </div>
              </Link>
            </div>

            <section className="mt-4 space-y-3">
              {filteredSections.length === 0 ? (
                <div className="text-center text-sm text-gray-400 py-8">
                  چیزی پیدا نشد
                </div>
              ) : (
                filteredSections.map((section) => (
                  <Link
                    key={section.href}
                    href={section.href}
                    className={`block rounded-3xl ${section.bgColor} border ${section.borderColor} p-5 shadow-sm hover:shadow-lg transition-all active:scale-95`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/70 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                        <span className="text-2xl">{section.emoji}</span>
                      </div>
                      <div className="flex-1 text-right">
                        <h2 className={`text-lg font-bold ${section.textColor}`}>
                          {section.title}
                        </h2>
                        <p className={`text-xs ${section.descColor} mt-1`}>
                          {section.description}
                        </p>
                      </div>
                      <span className={`${section.descColor} text-xl opacity-60`}>
                        ←
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </section>
          </>
        )}

        <div className="mt-6 bg-pink-50 rounded-2xl p-4 border border-pink-100 text-xs text-pink-600 leading-relaxed text-center">
          💕 همراه تو در مسیر مادر بودن.
        </div>
      </div>

      {/* دکمه چت با AI */}
      <Link
        href="/chat"
        className="fixed bottom-40 left-4 right-4 z-[60] bg-gradient-to-l from-pink-500 to-purple-500 shadow-xl rounded-2xl py-3 px-4 flex items-center justify-center gap-2 hover:shadow-2xl transition-all active:scale-95 max-w-md mx-auto"
        aria-label="چت با دستیار مادریار"
      >
        <span className="text-2xl">🤖</span>
        <span className="text-white font-bold text-sm">
          چت با هوش مصنوعی مادریار
        </span>
        <span className="absolute top-2 right-3 w-2 h-2 bg-green-400 rounded-full border border-white animate-pulse"></span>
      </Link>
    </div>
  );
}