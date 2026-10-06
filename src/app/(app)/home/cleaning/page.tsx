"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import missionsData from "@/content/home/cleaning/missions.json";

type Mission = {
  id: number;
  time: number;
  energy: string;
  tasks: string[];
  tip: string;
};

const TIMES = [
  { value: 5, label: "۵ دقیقه", emoji: "⚡" },
  { value: 10, label: "۱۰ دقیقه", emoji: "🕐" },
  { value: 15, label: "۱۵ دقیقه", emoji: "⏰" },
  { value: 30, label: "۳۰ دقیقه", emoji: "🧹" },
];

const ENERGIES = [
  { value: "low", label: "خسته", emoji: "😴" },
  { value: "medium", label: "معمولی", emoji: "😐" },
  { value: "high", label: "پرانرژی", emoji: "⚡" },
];

export default function CleaningPage() {
  const [step, setStep] = useState<"time" | "energy" | "result">("time");
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<string | null>(null);
  const [suggestedMission, setSuggestedMission] = useState<Mission | null>(null);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const suggestMission = (energy: string) => {
    setSelectedEnergy(energy);
    const time = selectedTime || 5;

    const filtered = (missionsData.missions as Mission[]).filter(
      (m) => m.time === time && m.energy === energy
    );

    const mission = filtered.length > 0
      ? filtered[Math.floor(Math.random() * filtered.length)]
      : missionsData.missions[0];

    setSuggestedMission(mission);
    setCompletedTasks([]);
    setStep("result");
  };

  const toggleTask = (idx: number) => {
    setCompletedTasks((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const reset = () => {
    setStep("time");
    setSelectedTime(null);
    setSelectedEnergy(null);
    setSuggestedMission(null);
    setCompletedTasks([]);
  };

  if (!isLoaded) return null;

  const allDone = suggestedMission
    ? completedTasks.length === suggestedMission.tasks.length
    : false;

  return (
    <div className="space-y-5 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-cyan-800">🧹 تمیزی و نظم</h1>
        <p className="text-sm text-gray-500">چیکار کنم تو خونه؟</p>
      </header>

      {/* مرحله ۱: زمان */}
      {step === "time" && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-cyan-100 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-4">
              ⏱ چقدر وقت داری؟
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {TIMES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => {
                    setSelectedTime(t.value);
                    setStep("energy");
                  }}
                  className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-2xl p-4 text-center hover:from-cyan-100 hover:to-blue-100 hover:scale-105 active:scale-95 transition-all"
                >
                  <div className="text-3xl mb-2">{t.emoji}</div>
                  <span className="text-sm font-bold text-cyan-800">
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* لینک راهنماها */}
          <div className="bg-white rounded-2xl p-4 border border-cyan-100 shadow-sm">
            <p className="text-xs font-bold text-cyan-800 mb-3">
              📚 یا راهنمای کامل رو ببین:
            </p>
            <div className="space-y-2">
              <Link
                href="/home/cleaning/guide"
                className="block bg-cyan-50 rounded-xl p-3 text-xs text-cyan-800 hover:bg-cyan-100 transition-all"
              >
                🧼 راهنمای تمیزی
              </Link>
              <Link
                href="/home/cleaning/secrets"
                className="block bg-cyan-50 rounded-xl p-3 text-xs text-cyan-800 hover:bg-cyan-100 transition-all"
              >
                ✨ راز کدبانو
              </Link>
              <Link
                href="/home/cleaning/clothes"
                className="block bg-cyan-50 rounded-xl p-3 text-xs text-cyan-800 hover:bg-cyan-100 transition-all"
              >
                👕 لباس‌ها
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* مرحله ۲: انرژی */}
      {step === "energy" && (
        <div className="space-y-4">
          <button
            onClick={() => setStep("time")}
            className="text-xs text-cyan-600 flex items-center gap-1 hover:gap-2 transition-all"
          >
            → برگشت
          </button>

          <div className="bg-white rounded-3xl p-5 border border-cyan-100 shadow-sm">
            <h2 className="font-bold text-gray-800 mb-4">
              💪 انرژی امروزت چقدره؟
            </h2>
            <div className="space-y-3">
              {ENERGIES.map((e) => (
                <button
                  key={e.value}
                  onClick={() => suggestMission(e.value)}
                  className="w-full bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100 rounded-2xl p-4 text-center hover:from-cyan-100 hover:to-blue-100 hover:scale-105 active:scale-95 transition-all"
                >
                  <div className="text-3xl mb-2">{e.emoji}</div>
                  <span className="text-sm font-bold text-cyan-800">
                    {e.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* مرحله ۳: نتیجه */}
      {step === "result" && suggestedMission && (
        <div className="space-y-4">
          <button
            onClick={reset}
            className="text-xs text-cyan-600 flex items-center gap-1 hover:gap-2 transition-all"
          >
            → فیلتر جدید
          </button>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-6 border border-cyan-100 shadow-lg">
            <div className="text-center space-y-2 mb-4">
              <div className="text-5xl">🎯</div>
              <h2 className="text-xl font-bold text-cyan-900">
                مأموریت امروز
              </h2>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <div className="bg-white/70 rounded-full px-3 py-1 text-xs text-cyan-700">
                  ⏱ {selectedTime} دقیقه
                </div>
                <div className="bg-white/70 rounded-full px-3 py-1 text-xs text-cyan-700">
                  {ENERGIES.find((e) => e.value === selectedEnergy)?.emoji}{" "}
                  {ENERGIES.find((e) => e.value === selectedEnergy)?.label}
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-cyan-200 my-4" />

            <div className="space-y-2 mb-4">
              {suggestedMission.tasks.map((task, idx) => {
                const isDone = completedTasks.includes(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleTask(idx)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isDone
                        ? "bg-green-50 border border-green-200"
                        : "bg-white/70 border border-cyan-100 hover:bg-white"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                        isDone
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 border-2 border-gray-200"
                      }`}
                    >
                      {isDone && "✓"}
                    </div>
                    <span
                      className={`text-sm text-right flex-1 ${
                        isDone
                          ? "text-green-700 line-through"
                          : "text-cyan-900"
                      }`}
                    >
                      {task}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="bg-cyan-100/70 border-r-4 border-cyan-400 rounded-2xl p-3 mb-4">
              <p className="text-xs text-cyan-800 leading-relaxed">
                💜 {suggestedMission.tip}
              </p>
            </div>

            {allDone && (
              <div className="bg-green-100 border border-green-200 rounded-2xl p-4 text-center mb-4">
                <div className="text-3xl mb-2">🎉</div>
                <p className="text-sm font-bold text-green-700">
                  آفرین! مأموریت رو تموم کردی!
                </p>
              </div>
            )}

            {/* لینک راهنماها */}
            <div className="border-t border-cyan-200 pt-4">
              <p className="text-xs font-bold text-cyan-800 mb-2">
                📚 راهنمای کامل:
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Link
                  href="/home/cleaning/guide"
                  className="bg-white/70 rounded-xl p-2 text-xs text-cyan-800 text-center hover:bg-white transition-all"
                >
                  🧼 راهنما
                </Link>
                <Link
                  href="/home/cleaning/secrets"
                  className="bg-white/70 rounded-xl p-2 text-xs text-cyan-800 text-center hover:bg-white transition-all"
                >
                  ✨ رازها
                </Link>
                <Link
                  href="/home/cleaning/clothes"
                  className="bg-white/70 rounded-xl p-2 text-xs text-cyan-800 text-center hover:bg-white transition-all"
                >
                  👕 لباس‌ها
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-cyan-50 rounded-2xl p-4 border border-cyan-100 text-xs text-cyan-600 text-center">
        💙 یه قدم کوچیک، خونه‌ی مرتب‌تر
      </div>
    </div>
  );
}