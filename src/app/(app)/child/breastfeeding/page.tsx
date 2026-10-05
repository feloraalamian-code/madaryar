"use client";

import { useState, useEffect, useRef } from "react";
import data from "@/content/child/breastfeeding.json";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type BreastfeedingSession = {
  id: string;
  side: "left" | "right";
  duration: number; // seconds
  date: string;
};

export default function BreastfeedingPage() {
  // تایمر
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [side, setSide] = useState<"left" | "right">("right");
  const [isLoaded, setIsLoaded] = useState(false);

  // تاریخچه
  const [sessions, setSessions] = useLocalStorage<BreastfeedingSession[]>(
    "breastfeeding-sessions",
    []
  );

  // محتوای باز/بسته
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // تایمر
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const handleSave = () => {
    if (seconds === 0) return;

    const newSession: BreastfeedingSession = {
      id: Date.now().toString(),
      side,
      duration: seconds,
      date: new Date().toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setSessions([newSession, ...sessions].slice(0, 10)); // فقط ۱۰ تا آخر
    setSeconds(0);
    setIsRunning(false);
  };

  const handleDelete = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-pink-500">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-pink-800">
          🍼 {data.title}
        </h1>
        <p className="text-sm text-gray-500">{data.subtitle}</p>
      </header>

      {/* تایمر شیردهی */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-5 border border-pink-100 shadow-sm">
        <h2 className="text-sm font-bold text-pink-800 mb-4 text-center">
          ⏱️ تایمر شیردهی
        </h2>

        {/* انتخاب سمت */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSide("right")}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              side === "right"
                ? "bg-pink-500 text-white shadow-md"
                : "bg-white text-pink-600 border border-pink-200"
            }`}
          >
            🍼 سینه راست
          </button>
          <button
            onClick={() => setSide("left")}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
              side === "left"
                ? "bg-pink-500 text-white shadow-md"
                : "bg-white text-pink-600 border border-pink-200"
            }`}
          >
            🍼 سینه چپ
          </button>
        </div>

        {/* نمایش زمان */}
        <div className="bg-white rounded-2xl p-6 text-center mb-4 shadow-sm">
          <div className="text-5xl font-bold text-pink-600 tabular-nums">
            {formatTime(seconds)}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {side === "right" ? "سینه راست" : "سینه چپ"}
          </p>
        </div>

        {/* دکمه‌ها */}
        <div className="flex gap-2">
          <button
            onClick={handleStartStop}
            className={`flex-1 py-3 rounded-2xl font-bold transition-all active:scale-95 ${
              isRunning
                ? "bg-amber-500 text-white"
                : "bg-pink-500 text-white"
            }`}
          >
            {isRunning ? "⏸️ توقف" : "▶️ شروع"}
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-600 font-bold active:scale-95"
          >
            🔄
          </button>

          {seconds > 0 && (
            <button
              onClick={handleSave}
              className="px-4 py-3 rounded-2xl bg-green-500 text-white font-bold active:scale-95"
            >
              💾
            </button>
          )}
        </div>
      </section>

      {/* تاریخچه شیردهی */}
      {sessions.length > 0 && (
        <section className="bg-white rounded-2xl border border-pink-100 p-4 shadow-sm">
          <h2 className="text-sm font-bold text-pink-800 mb-3">
            📋 آخرین شیردهی‌ها
          </h2>
          <div className="space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center gap-2 bg-pink-50 rounded-xl p-2"
              >
                <span className="text-lg">
                  {session.side === "right" ? "🍼" : "🍼"}
                </span>
                <div className="flex-1">
                  <p className="text-xs text-gray-700 font-medium">
                    {formatTime(session.duration)}
                  </p>
                  <p className="text-[10px] text-gray-500">{session.date}</p>
                </div>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full text-pink-600">
                  {session.side === "right" ? "راست" : "چپ"}
                </span>
                <button
                  onClick={() => handleDelete(session.id)}
                  className="text-gray-400 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* محتوای راهنما */}
      <section className="space-y-3">
        {data.content.sections.map((section) => {
          const isExpanded = expandedSection === section.id;

          return (
            <div
              key={section.id}
              className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedSection(isExpanded ? null : section.id)
                }
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-pink-50/50 transition-colors"
              >
                <span className="text-2xl">{section.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-pink-900 text-sm">
                    {section.title}
                  </h3>
                </div>
                <span
                  className={`text-pink-400 transition-transform ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                >
                  ←
                </span>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-pink-100">
                  <ul className="space-y-2">
                    {section.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-pink-800 flex items-start gap-2"
                      >
                        <span className="text-pink-400 mt-1">▸</span>
                        <span className="leading-loose">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 text-xs text-pink-600 leading-relaxed text-center">
        💕 تو داری بهترین کار رو می‌کنی.
      </div>
    </div>
  );
}