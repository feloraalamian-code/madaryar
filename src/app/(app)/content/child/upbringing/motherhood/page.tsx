"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import recipesData from "@/content/home/cooking/recipes.json";

type Recipe = {
  id: number;
  title: string;
  icon: string;
  time: string;
  timeLabel: string;
  difficulty: string;
  servings: string;
  mainIngredients: string[];
  ingredients: string[];
  steps: string[];
  tip: string;
};

const TIMES = [
  { value: "15", label: "۱۵ دقیقه", emoji: "⚡" },
  { value: "30", label: "۳۰ دقیقه", emoji: "🕐" },
  { value: "45", label: "۴۵ دقیقه", emoji: "⏰" },
  { value: "60", label: "۶۰+ دقیقه", emoji: "🍲" },
];

const INGREDIENTS = [
  { id: "مرغ", label: "مرغ", emoji: "🍗" },
  { id: "گوشت", label: "گوشت", emoji: "🥩" },
  { id: "ماهی", label: "ماهی", emoji: "🐟" },
  { id: "برنج", label: "برنج", emoji: "🍚" },
  { id: "ماکارونی", label: "ماکارونی", emoji: "🍝" },
  { id: "سیب‌زمینی", label: "سیب‌زمینی", emoji: "🥔" },
  { id: "پیاز", label: "پیاز", emoji: "🧅" },
  { id: "گوجه", label: "گوجه", emoji: "🍅" },
  { id: "هویج", label: "هویج", emoji: "🥕" },
  { id: "لوبیا", label: "لوبیا", emoji: "🫘" },
  { id: "بادمجان", label: "بادمجان", emoji: "🍆" },
  { id: "سبزی", label: "سبزی", emoji: "🥬" },
];

export default function CookingPage() {
  const [step, setStep] = useState<"time" | "ingredients" | "result">("time");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [suggestedRecipe, setSuggestedRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useLocalStorage<number[]>(
    "saved-recipes",
    []
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const suggestRecipe = () => {
    setIsSpinning(true);
    setShowConfetti(false);

    setTimeout(() => {
      const allRecipes = recipesData.recipes as Recipe[];
      const timeNum = parseInt(selectedTime || "999");

      // مرحله ۱: فیلتر کامل (زمان + مواد)
      let filtered = allRecipes.filter((recipe) => {
        // زمان
        if (selectedTime && timeNum < 60) {
          const recipeTime = parseInt(recipe.time);
          if (recipeTime > timeNum) return false;
        }
        // مواد
        if (selectedIngredients.length > 0) {
          const hasIngredient = selectedIngredients.some((ing) =>
            recipe.mainIngredients.includes(ing)
          );
          if (!hasIngredient) return false;
        }
        return true;
      });

      // مرحله ۲: اگه خالی: فقط زمان
      if (filtered.length === 0 && selectedTime && timeNum < 60) {
        filtered = allRecipes.filter((recipe) => {
          const recipeTime = parseInt(recipe.time);
          return recipeTime <= timeNum;
        });
      }

      // مرحله ۳: اگه خالی: فقط مواد
      if (filtered.length === 0 && selectedIngredients.length > 0) {
        filtered = allRecipes.filter((recipe) =>
          selectedIngredients.some((ing) =>
            recipe.mainIngredients.includes(ing)
          )
        );
      }

      // مرحله ۴: همه
      if (filtered.length === 0) {
        filtered = allRecipes;
      }

      const random = filtered[Math.floor(Math.random() * filtered.length)];
      setSuggestedRecipe(random);
      setIsSpinning(false);
      setStep("result");
      setShowConfetti(true);

      setTimeout(() => setShowConfetti(false), 3000);
    }, 1500);
  };

  const newSuggestion = () => {
    if (!suggestedRecipe) return;

    setIsSpinning(true);
    setShowConfetti(false);

    setTimeout(() => {
      const allRecipes = recipesData.recipes as Recipe[];
      const timeNum = parseInt(selectedTime || "999");

      let filtered = allRecipes.filter((recipe) => {
        if (recipe.id === suggestedRecipe.id) return false;

        if (selectedTime && timeNum < 60) {
          const recipeTime = parseInt(recipe.time);
          if (recipeTime > timeNum) return false;
        }
        if (selectedIngredients.length > 0) {
          const hasIngredient = selectedIngredients.some((ing) =>
            recipe.mainIngredients.includes(ing)
          );
          if (!hasIngredient) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        filtered = allRecipes.filter((r) => r.id !== suggestedRecipe.id);
      }

      const random = filtered[Math.floor(Math.random() * filtered.length)];
      setSuggestedRecipe(random);
      setIsSpinning(false);
      setShowConfetti(true);

      setTimeout(() => setShowConfetti(false), 3000);
    }, 1500);
  };

  const toggleSave = (id: number) => {
    setSavedRecipes((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const resetFilters = () => {
    setStep("time");
    setSelectedTime(null);
    setSelectedIngredients([]);
    setSuggestedRecipe(null);
    setIsSpinning(false);
    setShowConfetti(false);
  };

  if (!isLoaded) return null;

  return (
    <div className="space-y-5 pb-8 relative">
      {/* کانفتی */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            >
              {["🎉", "✨", "🌟", "💫", "⭐"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-amber-800">🍳 آشپزی</h1>
        <p className="text-sm text-gray-500">امروز چی بپزم؟</p>
      </header>

      {/* حالت چرخش */}
      {isSpinning && (
        <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-12 border border-amber-200 shadow-lg">
          <div className="text-center space-y-6">
            <div className="text-7xl animate-spin-slow">🥘</div>
            <div className="space-y-2">
              <p className="text-lg font-bold text-amber-800">
                دارم برات می‌گردم...
              </p>
              <div className="flex justify-center gap-1">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* مرحله ۱: زمان */}
      {step === "time" && !isSpinning && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-5 border border-amber-100 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-4">
              ⏱ چقدر وقت داری؟
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {TIMES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => {
                    setSelectedTime(t.value);
                    setStep("ingredients");
                  }}
                  className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-4 text-center hover:from-amber-100 hover:to-orange-100 hover:scale-105 active:scale-95 transition-all"
                >
                  <div className="text-3xl mb-2">{t.emoji}</div>
                  <span className="text-sm font-bold text-amber-800">
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedTime(null);
              setStep("ingredients");
            }}
            className="w-full text-sm text-gray-400 py-2 hover:text-amber-600 transition-colors"
          >
            مهم نیست، مستقیم پیشنهاد بده
          </button>
        </div>
      )}

      {/* مرحله ۲: مواد */}
      {step === "ingredients" && !isSpinning && (
        <div className="space-y-4 animate-fade-in">
          <button
            onClick={() => setStep("time")}
            className="text-xs text-amber-600 flex items-center gap-1 hover:gap-2 transition-all"
          >
            → برگشت
          </button>

          <div className="bg-white rounded-3xl p-5 border border-amber-100 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-2">
              🍗 چه موادی داری؟
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              (اختیاری - می‌تونی رد کنی)
            </p>
            <div className="grid grid-cols-2 gap-2">
              {INGREDIENTS.map((ing) => {
                const isSelected = selectedIngredients.includes(ing.id);
                return (
                  <button
                    key={ing.id}
                    onClick={() => toggleIngredient(ing.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-gradient-to-br from-amber-100 to-orange-100 border-amber-300 scale-105 shadow-sm"
                        : "bg-gray-50 border-gray-100 hover:bg-amber-50"
                    }`}
                  >
                    <span className="text-lg">{ing.emoji}</span>
                    <span className="text-xs text-gray-700">{ing.label}</span>
                    {isSelected && (
                      <span className="text-amber-600 mr-auto">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={suggestRecipe}
            className="w-full bg-gradient-to-l from-amber-500 to-orange-500 text-white font-bold py-4 rounded-2xl active:scale-95 shadow-md hover:shadow-lg transition-all text-lg"
          >
            🎲 پیشنهاد بده
          </button>
        </div>
      )}

      {/* مرحله ۳: نتیجه */}
      {step === "result" && suggestedRecipe && !isSpinning && (
        <div className="space-y-4 animate-fade-in">
          <button
            onClick={resetFilters}
            className="text-xs text-amber-600 flex items-center gap-1 hover:gap-2 transition-all"
          >
            → فیلتر جدید
          </button>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-100 shadow-lg animate-slide-up">
            <div className="text-center space-y-3 mb-4">
              <div className="text-7xl animate-bounce-in">
                {suggestedRecipe.icon}
              </div>
              <h2 className="text-2xl font-bold text-amber-900 animate-fade-in">
                {suggestedRecipe.title}
              </h2>

              <div className="flex items-center justify-center gap-2 flex-wrap">
                <div className="bg-white/70 rounded-full px-3 py-1 text-xs text-amber-700">
                  ⏱ {suggestedRecipe.timeLabel}
                </div>
                <div className="bg-white/70 rounded-full px-3 py-1 text-xs text-amber-700">
                  📊 {suggestedRecipe.difficulty}
                </div>
                <div className="bg-white/70 rounded-full px-3 py-1 text-xs text-amber-700">
                  👥 {suggestedRecipe.servings}
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-amber-200 my-4" />

            <div className="mb-4">
              <h3 className="text-sm font-bold text-amber-800 mb-2">
                📝 مواد لازم:
              </h3>
              <ul className="space-y-1.5">
                {suggestedRecipe.ingredients.map((ing, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-amber-800 flex items-start gap-2"
                  >
                    <span className="text-amber-400">▸</span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <details className="bg-white/60 rounded-2xl p-3 mb-4">
              <summary className="text-sm font-bold text-amber-800 cursor-pointer hover:text-amber-600">
                👨‍🍳 مراحل پخت
              </summary>
              <ol className="space-y-2 mt-3">
                {suggestedRecipe.steps.map((s, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-amber-900"
                  >
                    <span className="bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
            </details>

            <div className="bg-amber-100/70 border-r-4 border-amber-400 rounded-2xl p-3 mb-4">
              <p className="text-xs font-bold text-amber-800 mb-1">💡 نکته:</p>
              <p className="text-xs text-amber-800 leading-relaxed">
                {suggestedRecipe.tip}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => toggleSave(suggestedRecipe.id)}
                className={`py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 ${
                  savedRecipes.includes(suggestedRecipe.id)
                    ? "bg-gradient-to-l from-pink-500 to-rose-500 text-white"
                    : "bg-white text-pink-600 border border-pink-200 hover:bg-pink-50"
                }`}
              >
                {savedRecipes.includes(suggestedRecipe.id)
                  ? "❤️ ذخیره شد"
                  : "🤍 ذخیره"}
              </button>

              <button
                onClick={newSuggestion}
                className="bg-gradient-to-l from-amber-500 to-orange-500 text-white py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all hover:shadow-lg"
              >
                🔄 یکی دیگه
              </button>
            </div>
          </div>
        </div>
      )}

      {savedRecipes.length > 0 && step !== "result" && !isSpinning && (
        <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
          <p className="text-xs font-bold text-pink-700 mb-2">
            ❤️ دستورهای ذخیره شده: {savedRecipes.length}
          </p>
        </div>
      )}

      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-xs text-amber-600 text-center">
        🍽️ هر روز یه پیشنهاد جدید
      </div>

      {/* استایل انیمیشن‌ها */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          to {
            transform: rotate(360deg) scale(1);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 1.5s linear infinite;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        @keyframes bounce-in {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}