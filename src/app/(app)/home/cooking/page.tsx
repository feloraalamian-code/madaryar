"use client";

import { useState } from "react";
import recipesData from "@/content/home/cooking/recipes.json";

export default function CookingPage() {
  // انتخاب اولیه بر اساس تاریخ
  const initialIndex =
    Math.floor(Date.now() / (1000 * 60 * 60 * 24)) %
    recipesData.todayRecipes.length;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const todayRecipe = recipesData.todayRecipes[currentIndex];

  // تغییر پیشنهاد به صورت تصادفی
  const handleNewSuggestion = () => {
    let newIndex = currentIndex;
    // اطمینان از اینکه پیشنهاد جدید با قبلی فرق داشته باشه
    while (newIndex === currentIndex) {
      newIndex = Math.floor(Math.random() * recipesData.todayRecipes.length);
    }
    setCurrentIndex(newIndex);
  };

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-amber-800">
          🍳 آشپزی
        </h1>
        <p className="text-sm text-gray-500">
          یه پیشنهاد برای امروزت
        </p>
      </header>

      <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-100 shadow-sm">
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-3">{todayRecipe.icon}</div>
            <h2 className="text-2xl font-bold text-amber-900">
              {todayRecipe.title}
            </h2>
          </div>

          <div className="w-full h-px bg-amber-200 my-4" />

          <div>
            <h3 className="text-sm font-medium text-amber-700 mb-3">
              📝 مواد لازم:
            </h3>
            <ul className="space-y-2">
              {todayRecipe.ingredients.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-amber-800 flex items-start gap-2"
                >
                  <span className="text-amber-400">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* دکمه پیشنهاد دیگه */}
      <button
        onClick={handleNewSuggestion}
        className="w-full bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
      >
        <span className="text-xl">🎲</span>
        <span>یه پیشنهاد دیگه بده</span>
      </button>

      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-xs text-amber-600 leading-relaxed text-center">
        🍽️ هر روز یه پیشنهاد جدید
      </div>
    </div>
  );
}