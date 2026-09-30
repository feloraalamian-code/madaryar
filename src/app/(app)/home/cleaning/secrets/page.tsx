"use client";

import { useState } from "react";
import secretsData from "@/content/home/cleaning/secrets.json";

export default function SecretsPage() {
  const initialIndex =
    Math.floor(Date.now() / (1000 * 60 * 60 * 24)) %
    secretsData.secrets.length;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const todaySecret = secretsData.secrets[currentIndex];

  const handleNewSuggestion = () => {
    let newIndex = currentIndex;
    while (newIndex === currentIndex) {
      newIndex = Math.floor(Math.random() * secretsData.secrets.length);
    }
    setCurrentIndex(newIndex);
  };

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-blue-800">
          ✨ راز کدبانو
        </h1>
        <p className="text-sm text-gray-500">
          یه نکته برای امروزت
        </p>
      </header>

      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 shadow-sm">
        <div className="text-center space-y-6">
          <div className="text-6xl">{todaySecret.icon}</div>

          <div className="w-16 h-1 bg-blue-200 rounded-full mx-auto" />

          <p className="text-lg text-blue-900 leading-loose px-2">
            {todaySecret.text}
          </p>

          <div className="w-16 h-1 bg-blue-200 rounded-full mx-auto" />

          <p className="text-xs text-blue-400">
            ✨ راز کدبانو
          </p>
        </div>
      </section>

      <button
        onClick={handleNewSuggestion}
        className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
      >
        <span className="text-xl">🎲</span>
        <span>یه راز دیگه بده</span>
      </button>

      <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 text-xs text-blue-600 leading-relaxed text-center">
        💙 هر روز یه راز جدید
      </div>
    </div>
  );
}