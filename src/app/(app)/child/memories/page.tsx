"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type Memory = {
  id: string;
  title: string;
  emoji: string;
  date: string;
  text: string;
  category: string;
};

const CATEGORIES = [
  { id: "first", label: "🎉 اولین‌ها", emoji: "🎉" },
  { id: "words", label: "💬 جملات بامزه", emoji: "💬" },
  { id: "moments", label: "📸 لحظه‌های خاص", emoji: "📸" },
  { id: "achievements", label: "🌟 دستاوردها", emoji: "🌟" },
];

const EMOJI_OPTIONS = [
  "🎉", "👶", "😄", "💬", "📸", "🌟",
  "🎂", "🚶", "🦷", "🏫", "👫", "🎨",
  "🚲", "🏊", "📚", "🎵", "🍎", "🌸",
  "💜", "🤗", "😂", "🥰", "😍", "🎁",
];

export default function MemoriesPage() {
  const [memories, setMemories] = useLocalStorage<Memory[]>(
    "child-memories",
    []
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("🎉");
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("first");

  useEffect(() => {
    setIsLoaded(true);
    setDate(new Date().toLocaleDateString("fa-IR"));
  }, []);

  const addMemory = () => {
    if (!title.trim() || !text.trim()) {
      alert("لطفاً عنوان و متن خاطره رو وارد کن");
      return;
    }

    const newMemory: Memory = {
      id: Date.now().toString(),
      title: title.trim(),
      emoji,
      date: date.trim() || new Date().toLocaleDateString("fa-IR"),
      text: text.trim(),
      category,
    };

    setMemories([newMemory, ...memories]);
    setTitle("");
    setEmoji("🎉");
    setDate(new Date().toLocaleDateString("fa-IR"));
    setText("");
    setCategory("first");
    setShowForm(false);
  };

  const deleteMemory = (id: string) => {
    if (confirm("این خاطره حذف بشه؟")) {
      setMemories(memories.filter((m) => m.id !== id));
    }
  };

  // گروه‌بندی بر اساس دسته
  const groupedMemories = CATEGORIES.map((cat) => ({
    ...cat,
    items: memories.filter((m) => m.category === cat.id),
  })).filter((cat) => cat.items.length > 0);

  if (!isLoaded) return null;

  return (
    <div className="space-y-5 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-purple-800">📸 خاطرات کودک</h1>
        <p className="text-sm text-gray-500">
          لحظه‌های قشنگ رو ثبت کن
        </p>
      </header>

      <Link
        href="/child"
        className="text-xs text-purple-600 flex items-center gap-1"
      >
        → برگشت
      </Link>

      {/* خلاصه */}
      {memories.length > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-5 border border-purple-100 shadow-sm text-center">
          <div className="text-4xl mb-2">💜</div>
          <p className="text-sm text-purple-900 font-bold">
            {memories.length} خاطره قشنگ ثبت شده
          </p>
          <p className="text-xs text-purple-600 mt-1">
            هر کدومش یه گنجه
          </p>
        </div>
      )}

      {/* دکمه ثبت */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-gradient-to-l from-purple-500 to-pink-500 text-white font-bold py-4 rounded-2xl shadow-md active:scale-95 transition-all text-lg"
        >
          ➕ خاطره جدید
        </button>
      )}

      {/* فرم */}
      {showForm && (
        <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-800">📝 خاطره جدید</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 text-xl"
            >
              ✕
            </button>
          </div>

          {/* عنوان */}
          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              عنوان خاطره
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً اولین قدم"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* ایموجی */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block">
              آیکون
            </label>
            <div className="grid grid-cols-8 gap-1">
              {EMOJI_OPTIONS.map((e) => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`text-2xl p-2 rounded-xl transition-all ${
                    emoji === e
                      ? "bg-purple-100 scale-110"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* تاریخ */}
          <div>
            <label className="text-xs text-gray-600 mb-1 block">تاریخ</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="۱۴۰۴/۰۷/۱۵"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400"
              dir="ltr"
            />
          </div>

          {/* دسته */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block">دسته</label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`py-2.5 px-3 rounded-xl border text-xs transition-all ${
                    category === cat.id
                      ? "bg-purple-50 border-purple-300 text-purple-800 font-bold"
                      : "bg-gray-50 border-gray-200 text-gray-600"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* متن */}
          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              متن خاطره
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="امروز چه اتفاقی افتاد؟..."
              rows={4}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-purple-400 resize-none"
            />
          </div>

          <button
            onClick={addMemory}
            className="w-full bg-gradient-to-l from-purple-500 to-pink-500 text-white font-bold py-3 rounded-2xl active:scale-95 transition-all"
          >
            ✅ ذخیره
          </button>
        </div>
      )}

      {/* لیست خاطرات (گروه‌بندی‌شده) */}
      {groupedMemories.length > 0 && (
        <section className="space-y-5">
          {groupedMemories.map((group) => (
            <div key={group.id}>
              <h2 className="text-sm font-bold text-gray-700 mb-3 px-1">
                {group.label} ({group.items.length})
              </h2>
              <div className="space-y-3">
                {group.items.map((memory) => (
                  <div
                    key={memory.id}
                    className="bg-white rounded-2xl border border-purple-100 shadow-sm p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                        {memory.emoji}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-purple-900 text-sm">
                            {memory.title}
                          </h3>
                          <button
                            onClick={() => deleteMemory(memory.id)}
                            className="text-gray-300 hover:text-red-500 text-xs flex-shrink-0"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="text-[10px] text-purple-500 mt-1">
                          📅 {memory.date}
                        </p>
                        <p className="text-xs text-gray-700 leading-relaxed mt-2 whitespace-pre-line">
                          {memory.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* اگه خاطره‌ای نیست */}
      {memories.length === 0 && !showForm && (
        <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm text-center">
          <div className="text-5xl mb-3">📸</div>
          <p className="text-sm text-gray-500 mb-2">
            هنوز خاطره‌ای ثبت نکردی
          </p>
          <p className="text-xs text-gray-400">
            اولین قدم، اولین حرف، اولین خنده...
          </p>
        </div>
      )}

      <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 text-xs text-purple-600 text-center">
        💜 خاطره‌ها، گنج‌های زندگی
      </div>
    </div>
  );
}