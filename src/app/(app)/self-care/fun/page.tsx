"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import funData from "@/content/self-care/fun.json";

type Category = "book" | "podcast" | "movie";

export default function FunPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("book");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("madaryar_saved_fun");
    if (saved) {
      try {
        setSavedItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    setCurrentIndex(dayIndex % getItems().length);
    setIsLoaded(true);
  }, [selectedCategory]);

  const getItems = () => {
    if (selectedCategory === "book") return funData.books;
    if (selectedCategory === "podcast") return funData.podcasts;
    return funData.movies;
  };

  const items = getItems();
  const currentItem = items[currentIndex];

  const changeCategory = (category: Category) => {
    setSelectedCategory(category);
    setShowDetail(false);
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const newItems =
      category === "book"
        ? funData.books
        : category === "podcast"
        ? funData.podcasts
        : funData.movies;
    setCurrentIndex(dayIndex % newItems.length);
  };

  const randomize = () => {
    let newIndex = currentIndex;
    while (newIndex === currentIndex) {
      newIndex = Math.floor(Math.random() * items.length);
    }
    setCurrentIndex(newIndex);
    setShowDetail(false);
  };

  const toggleSave = () => {
    const itemId = `${selectedCategory}-${currentItem.id}`;
    let updated;
    if (savedItems.includes(itemId)) {
      updated = savedItems.filter((id) => id !== itemId);
    } else {
      updated = [...savedItems, itemId];
    }
    setSavedItems(updated);
    localStorage.setItem("madaryar_saved_fun", JSON.stringify(updated));
  };

  const isSaved = savedItems.includes(`${selectedCategory}-${currentItem.id}`);

  if (!isLoaded || !currentItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-pink-500">در حال بارگذاری...</div>
      </div>
    );
  }

  const getIcon = () => {
    if (selectedCategory === "book") return "📚";
    if (selectedCategory === "podcast") return "🎙️";
    return "🎬";
  };

  const getCategoryName = () => {
    if (selectedCategory === "book") return "کتاب";
    if (selectedCategory === "podcast") return "پادکست";
    return "فیلم";
  };

  const getGradient = () => {
    if (selectedCategory === "book") return "from-pink-100 via-rose-100 to-pink-50";
    if (selectedCategory === "podcast") return "from-purple-100 via-violet-100 to-purple-50";
    return "from-blue-100 via-cyan-100 to-blue-50";
  };

  // صفحه جزئیات
  if (showDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 pb-8">
        <div className="max-w-md mx-auto px-4 pt-4">
          {/* هدر */}
          <button
            onClick={() => setShowDetail(false)}
            className="text-sm text-gray-500 mb-4 inline-block"
          >
            → برگشت
          </button>

          {/* کارت اصلی */}
          <div
            className={`bg-gradient-to-br ${getGradient()} rounded-3xl p-6 shadow-lg border border-white/50 mb-4`}
          >
            <div className="text-center mb-4">
              <div className="text-6xl mb-4">{getIcon()}</div>
              <div className="inline-block bg-white/70 rounded-full px-3 py-1 mb-4">
                <span className="text-xs font-bold text-gray-700">
                  {currentItem.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {currentItem.title}
              </h2>
              <p className="text-sm text-gray-700">
                {selectedCategory === "book" && `اثر ${currentItem.author}`}
                {selectedCategory === "podcast" && currentItem.host}
                {selectedCategory === "movie" &&
                  `کارگردان: ${currentItem.director}`}
              </p>
              {currentItem.year && (
                <p className="text-xs text-gray-500 mt-2">
                  📅 {currentItem.year}
                </p>
              )}
            </div>
          </div>

          {/* توضیحات */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
            <h3 className="font-bold text-gray-800 mb-3 text-sm">
              📝 درباره این {getCategoryName()}
            </h3>
            <p className="text-sm text-gray-700 leading-loose">
              {currentItem.description}
            </p>
          </div>

          {/* چرا این؟ */}
          {currentItem.whyThis && (
            <div className="bg-pink-50 rounded-2xl p-5 border border-pink-100 mb-4">
              <h3 className="font-bold text-pink-800 mb-3 text-sm">
                💜 چرا این برای تو؟
              </h3>
              <p className="text-sm text-pink-700 leading-loose">
                {currentItem.whyThis}
              </p>
            </div>
          )}

          {/* حال و هوا */}
          {currentItem.mood && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
              <h3 className="font-bold text-gray-800 mb-3 text-sm">
                🌸 حال و هوا
              </h3>
              <span className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
                {currentItem.mood}
              </span>
            </div>
          )}

          {/* دکمه‌ها */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={toggleSave}
              className={`py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 ${
                isSaved
                  ? "bg-pink-500 text-white"
                  : "bg-white text-pink-600 border border-pink-200"
              }`}
            >
              {isSaved ? "❤️ ذخیره شد" : "🤍 ذخیره"}
            </button>

            <button
              onClick={randomize}
              className="bg-white text-gray-700 border border-gray-200 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all"
            >
              🎲 پیشنهاد دیگه
            </button>
          </div>
        </div>
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
          <div className="text-4xl mb-2">🎉</div>
          <h1 className="text-2xl font-bold text-gray-800">تفریح</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            یه پیشنهاد قشنگ برای خودت.
          </p>
        </header>

        {/* دسته‌بندی */}
        <section className="grid grid-cols-3 gap-2 mb-6">
          <button
            onClick={() => changeCategory("book")}
            className={`py-3 rounded-2xl text-sm font-bold transition-all active:scale-95 ${
              selectedCategory === "book"
                ? "bg-pink-500 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-100"
            }`}
          >
            📚 کتاب
          </button>
          <button
            onClick={() => changeCategory("podcast")}
            className={`py-3 rounded-2xl text-sm font-bold transition-all active:scale-95 ${
              selectedCategory === "podcast"
                ? "bg-purple-500 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-100"
            }`}
          >
            🎙️ پادکست
          </button>
          <button
            onClick={() => changeCategory("movie")}
            className={`py-3 rounded-2xl text-sm font-bold transition-all active:scale-95 ${
              selectedCategory === "movie"
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-100"
            }`}
          >
            🎬 فیلم
          </button>
        </section>

        {/* کارت اصلی */}
        <section
          className={`bg-gradient-to-br ${getGradient()} rounded-3xl p-6 shadow-lg border border-white/50 mb-4`}
        >
          <div className="text-center mb-4">
            <div className="text-5xl mb-4">{getIcon()}</div>

            <div className="inline-block bg-white/70 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-gray-700">
                {getCategoryName()} امروز
              </span>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              {currentItem.title}
            </h2>

            <p className="text-xs text-gray-600 mb-1">
              {selectedCategory === "book" && `اثر ${currentItem.author}`}
              {selectedCategory === "podcast" && currentItem.host}
              {selectedCategory === "movie" &&
                `کارگردان: ${currentItem.director}`}
            </p>

            {currentItem.year && (
              <p className="text-[10px] text-gray-500">📅 {currentItem.year}</p>
            )}
          </div>

          <div className="w-full h-px bg-white/60 my-4" />

          <p className="text-sm text-gray-700 leading-loose text-center">
            {currentItem.description}
          </p>

          {currentItem.category && (
            <div className="text-center mt-4">
              <span className="text-[10px] bg-white/70 text-gray-600 px-3 py-1 rounded-full">
                {currentItem.category}
              </span>
            </div>
          )}
        </section>

        {/* دکمه‌ها */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={() => setShowDetail(true)}
            className="bg-gradient-to-l from-pink-500 to-purple-500 text-white font-bold py-3 rounded-2xl text-sm active:scale-95 transition-all"
          >
            📖 بیشتر بدون
          </button>

          <button
            onClick={toggleSave}
            className={`py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 ${
              isSaved
                ? "bg-pink-500 text-white"
                : "bg-white text-pink-600 border border-pink-200"
            }`}
          >
            {isSaved ? "❤️ ذخیره شد" : "🤍 ذخیره"}
          </button>
        </div>

        <button
          onClick={randomize}
          className="w-full bg-white text-gray-700 border border-gray-200 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all mb-6"
        >
          🎲 یه پیشنهاد دیگه
        </button>

        {/* علاقه‌مندی‌ها */}
        {savedItems.length > 0 && (
          <section className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
            <p className="text-xs font-bold text-pink-700 mb-2">
              ❤️ علاقه‌مندی‌ها: {savedItems.length}
            </p>
            <p className="text-[10px] text-pink-600 leading-relaxed">
              علاقه‌مندی‌هات ذخیره شدن.
            </p>
          </section>
        )}

        {/* فوتر */}
        <div className="mt-6 bg-pink-50 rounded-2xl p-4 border border-pink-100 text-xs text-pink-600 leading-relaxed text-center">
          💜 یه لحظه برای خودت
        </div>
      </div>
    </div>
  );
}