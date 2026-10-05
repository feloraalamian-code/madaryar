"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import breathingData from "@/content/self-care/breathing.json";

type Technique = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
};

type Phase = "idle" | "inhale" | "hold" | "exhale" | "done";

export default function BreathingPage() {
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null);
  const [rounds, setRounds] = useState(3);
  const [phase, setPhase] = useState<Phase>("idle");
  const [countdown, setCountdown] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [showContent, setShowContent] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // شروع تمرین
  const startExercise = (technique: Technique) => {
    setSelectedTechnique(technique);
    setCurrentRound(1);
    setPhase("inhale");
    setCountdown(technique.inhale);
  };

  // تایمر
  useEffect(() => {
    if (phase === "idle" || phase === "done" || !selectedTechnique) return;

    if (countdown > 0) {
      timerRef.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      // انتقال به فاز بعدی
      if (phase === "inhale") {
        if (selectedTechnique.hold > 0) {
          setPhase("hold");
          setCountdown(selectedTechnique.hold);
        } else {
          setPhase("exhale");
          setCountdown(selectedTechnique.exhale);
        }
      } else if (phase === "hold") {
        setPhase("exhale");
        setCountdown(selectedTechnique.exhale);
      } else if (phase === "exhale") {
        if (currentRound < rounds) {
          setCurrentRound(currentRound + 1);
          setPhase("inhale");
          setCountdown(selectedTechnique.inhale);
        } else {
          setPhase("done");
        }
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [countdown, phase, currentRound, rounds, selectedTechnique]);

  // لغو تمرین
  const cancelExercise = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("idle");
    setSelectedTechnique(null);
    setCountdown(0);
    setCurrentRound(1);
  };

  // شروع دوباره
  const restartExercise = () => {
    if (selectedTechnique) {
      setCurrentRound(1);
      setPhase("inhale");
      setCountdown(selectedTechnique.inhale);
    }
  };

  // انتخاب تکنیک جدید
  const chooseAnother = () => {
    setPhase("idle");
    setSelectedTechnique(null);
    setCountdown(0);
    setCurrentRound(1);
  };

  // تشخیص متن فاز
  const getPhaseText = () => {
    if (phase === "inhale") return "دم";
    if (phase === "hold") return "نگه‌دار";
    if (phase === "exhale") return "بازدم";
    return "";
  };

  // اندازه دایره بر اساس فاز
  const getCircleScale = () => {
    if (phase === "inhale") {
      const progress = 1 - countdown / (selectedTechnique?.inhale || 1);
      return 0.5 + progress * 0.5;
    }
    if (phase === "hold") return 1;
    if (phase === "exhale") {
      const progress = 1 - countdown / (selectedTechnique?.exhale || 1);
      return 1 - progress * 0.5;
    }
    return 0.5;
  };

  // صفحه در حال تمرین
  if (phase !== "idle" && selectedTechnique) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50 flex flex-col">
        <div className="max-w-md mx-auto w-full px-4 py-6 flex-1 flex flex-col">
          {/* هدر */}
          <div className="text-center mb-4">
            <p className="text-xs text-gray-500">
              دور {currentRound} از {rounds}
            </p>
          </div>

          {/* محتوای اصلی */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {phase === "done" ? (
              // پایان
              <div className="text-center space-y-6">
                <div className="text-6xl">🎉</div>
                <h2 className="text-2xl font-bold text-gray-800">
                  تمرین تموم شد!
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {rounds} دور انجام دادی
                  <br />
                  خیلی خوب بود 🌿
                </p>
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={restartExercise}
                    className="flex-1 bg-pink-500 text-white font-bold py-3 rounded-2xl active:scale-95 transition-all"
                  >
                    دوباره
                  </button>
                  <button
                    onClick={chooseAnother}
                    className="flex-1 bg-white text-pink-600 border border-pink-200 font-bold py-3 rounded-2xl active:scale-95 transition-all"
                  >
                    تکنیک دیگه
                  </button>
                </div>
              </div>
            ) : (
              // در حال تمرین
              <div className="text-center space-y-8 w-full">
                {/* دایره انیمیشن */}
                <div className="flex items-center justify-center h-64">
                  <div
                    className="rounded-full bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center transition-all duration-1000 ease-in-out shadow-lg"
                    style={{
                      width: "200px",
                      height: "200px",
                      transform: `scale(${getCircleScale()})`,
                    }}
                  >
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white drop-shadow-md">
                        {getPhaseText()}
                      </p>
                      <p className="text-3xl font-bold text-white mt-2 drop-shadow-md">
                        {countdown}
                      </p>
                    </div>
                  </div>
                </div>

                {/* دکمه توقف */}
                <button
                  onClick={cancelExercise}
                  className="bg-white text-gray-500 border border-gray-200 px-6 py-2 rounded-full text-sm"
                >
                  توقف
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // صفحه انتخاب تکنیک
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
          <div className="text-4xl mb-2">🧘</div>
          <h1 className="text-2xl font-bold text-gray-800">تمرین تنفس</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            چند دقیقه آرامش، برای خودت.
          </p>
        </header>

        {/* تکنیک‌ها */}
        <section className="space-y-3 mb-6">
          {breathingData.techniques.map((technique) => (
            <div
              key={technique.id}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{technique.icon}</span>
                <div className="flex-1">
                  <h2 className="font-bold text-gray-800">{technique.title}</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {technique.subtitle} · {technique.description}
                  </p>
                </div>
              </div>

              {/* انتخاب دور */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">چند دور؟</p>
                <div className="flex gap-2">
                  {[3, 5, 10].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRounds(r)}
                      className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                        rounds === r
                          ? "bg-pink-500 text-white"
                          : "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {r} دور
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => startExercise(technique)}
                className="w-full bg-gradient-to-l from-pink-500 to-purple-500 text-white font-bold py-3 rounded-2xl active:scale-[0.98] transition-all"
              >
                شروع تمرین
              </button>
            </div>
          ))}
        </section>

        {/* محتوای آموزشی */}
        <section className="space-y-3">
          <button
            onClick={() => setShowContent(!showContent)}
            className="w-full bg-white rounded-2xl p-4 text-right border border-gray-100 flex items-center justify-between"
          >
            <span className="font-bold text-gray-800 text-sm">
              📖 درباره تنفس
            </span>
            <span
              className={`text-gray-400 transition-transform ${
                showContent ? "rotate-90" : ""
              }`}
            >
              ←
            </span>
          </button>

          {showContent && (
            <div className="space-y-3">
              {breathingData.content.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-gray-100"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-gray-500">
                        {item.preview}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 leading-loose whitespace-pre-line">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* فوتر */}
        <div className="mt-6 bg-pink-50 rounded-2xl p-4 border border-pink-100 text-xs text-pink-600 leading-relaxed text-center">
          💜 هر نفس، یه قدم به آرامش
        </div>
      </div>
    </div>
  );
}