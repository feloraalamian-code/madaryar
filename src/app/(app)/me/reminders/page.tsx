"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Reminder = {
  id: string;
  title: string;
  emoji: string;
  time: string;
  category: string;
  repeat: string;
};

const CATEGORIES = [
  { id: "child", label: "👶 کودک" },
  { id: "self", label: "👩 خودم" },
];

const EMOJIS = [
  "🍼", "😴", "💊", "🎒", "📚",
  "☕", "💧", "🧘", "💜", "📞",
];

const REPEATS = [
  { id: "once", label: "یک‌بار" },
  { id: "daily", label: "روزانه" },
  { id: "weekly", label: "هفتگی" },
];

export default function RemindersPage() {
  const [reminders, setReminders] = useLocalStorage<Reminder[]>(
    "reminders",
    []
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("🍼");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [category, setCategory] = useState("child");
  const [repeat, setRepeat] = useState("daily");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const addReminder = () => {
    if (!title.trim() || !hour.trim() || !minute.trim()) {
      alert("لطفاً عنوان و زمان رو وارد کن");
      return;
    }

    const h = hour.padStart(2, "0");
    const m = minute.padStart(2, "0");

    const newReminder: Reminder = {
      id: Date.now().toString(),
      title: title.trim(),
      emoji,
      time: `${h}:${m}`,
      category,
      repeat,
    };

    setReminders(
      [...reminders, newReminder].sort((a, b) =>
        a.time.localeCompare(b.time)
      )
    );
    setTitle("");
    setEmoji("🍼");
    setHour("");
    setMinute("");
    setCategory("child");
    setRepeat("daily");
    setShowForm(false);
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  if (!isLoaded) return null;

  const childReminders = reminders.filter((r) => r.category === "child");
  const selfReminders = reminders.filter((r) => r.category === "self");

  return (
    <div className="space-y-4 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-cyan-800">🔔 یادآورها</h1>
        <p className="text-sm text-gray-500">کارهای روزانه‌ت رو فراموش نکن</p>
      </header>

      <Link
        href="/me"
        className="text-xs text-cyan-600 flex items-center gap-1"
      >
        → برگشت
      </Link>

      {/* دکمه افزودن */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-gradient-to-l from-cyan-500 to-sky-500 text-white font-bold py-4 rounded-2xl shadow-md active:scale-95 transition-all text-lg"
        >
          ➕ یادآور جدید
        </button>
      )}

      {/* فرم */}
      {showForm && (
        <div className="bg-white rounded-3xl p-5 border border-cyan-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-800">📝 یادآور جدید</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 text-xl"
            >
              ✕
            </button>
          </div>

          {/* عنوان */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block font-bold">
              عنوان
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً شیر دادن به رزا"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* ایموجی */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block font-bold">
              آیکون
            </label>
            <div className="grid grid-cols-5 gap-2">
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`text-2xl p-2 rounded-xl transition-all ${
                    emoji === e
                      ? "bg-cyan-100 scale-110 border-2 border-cyan-300"
                      : "hover:bg-gray-50 border-2 border-transparent"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* زمان - دو کادر */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block font-bold">
              زمان
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  placeholder="۱۰"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-center focus:outline-none focus:border-cyan-400"
                  dir="ltr"
                  min="0"
                  max="23"
                />
                <p className="text-[9px] text-gray-400 text-center mt-1">ساعت</p>
              </div>
              <div>
                <input
                  type="number"
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  placeholder="۳۰"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-center focus:outline-none focus:border-cyan-400"
                  dir="ltr"
                  min="0"
                  max="59"
                />
                <p className="text-[9px] text-gray-400 text-center mt-1">دقیقه</p>
              </div>
            </div>
          </div>

          {/* دسته */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block font-bold">
              دسته
            </label>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`py-3 rounded-xl font-bold text-sm transition-all ${
                    category === cat.id
                      ? cat.id === "child"
                        ? "bg-gradient-to-l from-pink-500 to-rose-500 text-white shadow-md scale-105"
                        : "bg-gradient-to-l from-violet-500 to-purple-500 text-white shadow-md scale-105"
                      : "bg-gray-50 text-gray-600 border-2 border-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* تکرار */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block font-bold">
              تکرار
            </label>
            <div className="grid grid-cols-3 gap-2">
              {REPEATS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRepeat(r.id)}
                  className={`py-3 rounded-xl text-xs font-bold transition-all ${
                    repeat === r.id
                      ? "bg-gradient-to-l from-cyan-500 to-sky-500 text-white shadow-md scale-105"
                      : "bg-gray-50 text-gray-600 border-2 border-gray-200"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={addReminder}
            className="w-full bg-gradient-to-l from-cyan-500 to-sky-500 text-white font-bold py-4 rounded-2xl active:scale-95 transition-all shadow-md"
          >
            ✅ ذخیره
          </button>
        </div>
      )}

      {/* لیست یادآورها */}
      {reminders.length > 0 ? (
        <section className="space-y-5">
          {/* کودک */}
          {childReminders.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-700 mb-2 px-1">
                👶 کودک ({childReminders.length})
              </h2>
              <div className="space-y-2">
                {childReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="bg-white rounded-2xl border border-pink-100 p-4 shadow-sm flex items-center gap-3"
                  >
                    <span className="text-2xl">{reminder.emoji}</span>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-pink-900">
                        {reminder.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-pink-600">
                          ⏰ {reminder.time}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          🔄{" "}
                          {REPEATS.find((r) => r.id === reminder.repeat)?.label}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="text-gray-300 hover:text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* خودم */}
          {selfReminders.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-700 mb-2 px-1">
                👩 خودم ({selfReminders.length})
              </h2>
              <div className="space-y-2">
                {selfReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="bg-white rounded-2xl border border-violet-100 p-4 shadow-sm flex items-center gap-3"
                  >
                    <span className="text-2xl">{reminder.emoji}</span>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-violet-900">
                        {reminder.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-violet-600">
                          ⏰ {reminder.time}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          🔄{" "}
                          {REPEATS.find((r) => r.id === reminder.repeat)?.label}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="text-gray-300 hover:text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ) : (
        !showForm && (
          <div className="bg-white rounded-3xl p-8 border border-cyan-100 shadow-sm text-center">
            <div className="text-5xl mb-3">🔔</div>
            <p className="text-sm text-gray-500 mb-2">
              هنوز یادآوری نداری
            </p>
            <p className="text-xs text-gray-400">
              اولین یادآورت رو بساز
            </p>
          </div>
        )
      )}

      <div className="bg-cyan-50 rounded-2xl p-4 border border-cyan-100 text-xs text-cyan-600 text-center">
        💙 یادآورها، بهت کمک می‌کنن چیزی رو فراموش نکنی
      </div>
    </div>
  );
}