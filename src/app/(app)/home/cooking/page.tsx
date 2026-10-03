"use client";

import { useState } from "react";
import recipesData from "@/content/home/cooking/recipes.json";

export default function CookingPage() {
  const initialIndex =
    Math.floor(Date.now() / (1000 * 60 * 60 * 24)) %
    recipesData.todayRecipes.length;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showSteps, setShowSteps] = useState(false);

  const recipe = recipesData.todayRecipes[currentIndex];

  const handleNewSuggestion = () => {
    let newIndex = currentIndex;
    while (newIndex === currentIndex) {
      newIndex = Math.floor(Math.random() * recipesData.todayRecipes.length);
    }
    setCurrentIndex(newIndex);
    setShowSteps(false);
  };

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-amber-800">🍳 آشپزی</h1>
        <p className="text-sm text-gray-500">یه پیشنهاد برای امروزت</p>
      </header>

      {/* کارت غذا */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-100 shadow-sm">
        <div className="space-y-4">
          {/* تصویر و عنوان */}
          <div className="text-center">
            <div className="text-6xl mb-3">{recipe.icon}</div>
            <h2 className="text-2xl font-bold text-amber-900">
              {recipe.title}
            </h2>
          </div>

          {/* اطلاعات سریع */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="bg-white/70 rounded-full px-3 py-1 text-xs text-amber-700">
              ⏱ {recipe.time}
            </div>
            <div className="bg-white/70 rounded-full px-3 py-1 text-xs text-amber-700">
              📊 {recipe.difficulty}
            </div>
            <div className="bg-white/70 rounded-full px-3 py-1 text-xs text-amber-700">
              👥 {recipe.servings}
            </div>
          </div>

          <div className="w-full h-px bg-amber-200 my-4" />

          {/* مواد لازم */}
          <div>
            <h3 className="text-sm font-bold text-amber-800 mb-3">
              📝 مواد لازم:
            </h3>
            <ul className="space-y-2">
              {recipe.ingredients.map((item, index) => (
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

          {/* دکمه نمایش مراحل پخت */}
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold py-3 rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <span>👨‍🍳</span>
            <span>{showSteps ? "بستن مراحل" : "نمایش مراحل پخت"}</span>
          </button>

          {/* مراحل پخت */}
          {showSteps && (
            <div className="bg-white/60 rounded-2xl p-4 space-y-3">
              <h3 className="text-sm font-bold text-amber-800">
                👨‍🍳 مراحل پخت:
              </h3>
              <ol className="space-y-3">
                {recipe.steps.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-amber-900"
                  >
                    <span className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="leading-loose">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* نکته */}
          {recipe.tip && (
            <div className="bg-amber-100/70 border-r-4 border-amber-400 rounded-2xl p-3">
              <p className="text-xs font-bold text-amber-800 mb-1">
                💡 نکته:
              </p>
              <p className="text-xs text-amber-800 leading-loose">
                {recipe.tip}
              </p>
            </div>
          )}
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