"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type ChildProfile = {
  name: string;
  birthDate: string;
};

type Measurement = {
  id: string;
  date: string;
  height: number;
  weight: number;
  headSize: number;
};

export default function GrowthPage() {
  const [profile, setProfile] = useLocalStorage<ChildProfile | null>(
    "child-profile",
    null
  );
  const [measurements, setMeasurements] = useLocalStorage<Measurement[]>(
    "child-measurements",
    []
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // فرم پروفایل
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  // فرم اندازه‌گیری
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [headSize, setHeadSize] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const saveProfile = () => {
    if (!name.trim() || !birthDate.trim()) {
      alert("لطفاً اسم و تاریخ تولد رو وارد کن");
      return;
    }
    setProfile({ name: name.trim(), birthDate: birthDate.trim() });
    setEditProfile(false);
    setName("");
    setBirthDate("");
  };

  const openEditProfile = () => {
    if (profile) {
      setName(profile.name);
      setBirthDate(profile.birthDate);
    }
    setEditProfile(true);
  };

  const addMeasurement = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const hs = parseFloat(headSize);

    if (!h || !w) {
      alert("قد و وزن رو وارد کن");
      return;
    }

    const newMeasurement: Measurement = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("fa-IR"),
      height: h,
      weight: w,
      headSize: hs || 0,
    };

    setMeasurements([...measurements, newMeasurement]);
    setHeight("");
    setWeight("");
    setHeadSize("");
    setShowForm(false);
  };

  const deleteMeasurement = (id: string) => {
    setMeasurements(measurements.filter((m) => m.id !== id));
  };

  const calcAge = (birthDate: string) => {
    try {
      // فرض: تاریخ شمسی
      const parts = birthDate.split("/").map((p) => parseInt(p));
      if (parts.length !== 3) return "—";

      const [by, bm, bd] = parts;
      const today = new Date().toLocaleDateString("fa-IR").split("/").map((p) => parseInt(p));
      const [ty, tm, td] = today;

      let years = ty - by;
      let months = tm - bm;
      let days = td - bd;

      if (days < 0) {
        months--;
        days += 30;
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      if (years > 0) {
        return `${years} سال و ${months} ماه`;
      } else if (months > 0) {
        return `${months} ماه و ${days} روز`;
      } else {
        return `${days} روز`;
      }
    } catch {
      return "—";
    }
  };

  const lastMeasurement = measurements[measurements.length - 1];
  const firstMeasurement = measurements[0];

  const heightChange =
    lastMeasurement && firstMeasurement && measurements.length > 1
      ? lastMeasurement.height - firstMeasurement.height
      : 0;

  if (!isLoaded) return null;

  // اگه پروفایل نداریم
  if (!profile && !editProfile) {
    return (
      <div className="space-y-5 pb-8">
        <header className="pt-4 text-center space-y-2">
          <h1 className="text-2xl font-bold text-pink-800">📊 گهواره رشد</h1>
          <p className="text-sm text-gray-500">پیگیری رشد کودک</p>
        </header>

        <Link
          href="/child"
          className="text-xs text-pink-600 flex items-center gap-1"
        >
          → برگشت
        </Link>

        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 border border-pink-100 shadow-sm text-center">
          <div className="text-6xl mb-4">👶</div>
          <h2 className="text-lg font-bold text-pink-900 mb-2">
            اول پروفایل بسازیم
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            اسم و تاریخ تولد کودک رو وارد کن
          </p>
          <button
            onClick={() => setEditProfile(true)}
            className="w-full bg-gradient-to-l from-pink-500 to-rose-500 text-white font-bold py-4 rounded-2xl shadow-md active:scale-95 transition-all"
          >
            ➕ ساخت پروفایل
          </button>
        </div>
      </div>
    );
  }

  // فرم پروفایل
  if (editProfile) {
    return (
      <div className="space-y-5 pb-8">
        <header className="pt-4 text-center space-y-2">
          <h1 className="text-2xl font-bold text-pink-800">👶 پروفایل کودک</h1>
        </header>

        <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm space-y-4">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">اسم کودک</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلاً رزا"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              تاریخ تولد (شمسی)
            </label>
            <input
              type="text"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              placeholder="مثلاً ۱۴۰۱/۰۱/۱۵"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400"
              dir="ltr"
            />
            <p className="text-[10px] text-gray-400 mt-1">
              فرمت: سال/ماه/روز (۱۴۰۱/۰۱/۱۵)
            </p>
          </div>

          <button
            onClick={saveProfile}
            className="w-full bg-gradient-to-l from-pink-500 to-rose-500 text-white font-bold py-3 rounded-2xl active:scale-95 transition-all"
          >
            ✅ ذخیره
          </button>

          {profile && (
            <button
              onClick={() => setEditProfile(false)}
              className="w-full text-xs text-gray-400 py-2"
            >
              انصراف
            </button>
          )}
        </div>
      </div>
    );
  }

  // صفحه اصلی گهواره
  return (
    <div className="space-y-5 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-pink-800">📊 گهواره رشد</h1>
        <p className="text-sm text-gray-500">پیگیری رشد کودک</p>
      </header>

      <Link
        href="/child"
        className="text-xs text-pink-600 flex items-center gap-1"
      >
        → برگشت
      </Link>

      {/* پروفایل */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-5 border border-pink-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm">
            👶
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-pink-900">{profile.name}</h2>
            <p className="text-xs text-pink-600 mt-1">
              🎂 {calcAge(profile.birthDate)}
            </p>
          </div>
          <button
            onClick={openEditProfile}
            className="text-pink-400 text-xl"
          >
            ✏️
          </button>
        </div>
      </div>

      {/* آخرین اندازه‌گیری */}
      {lastMeasurement ? (
        <>
          <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 text-sm">
                📏 آخرین اندازه‌گیری
              </h3>
              <span className="text-[10px] text-gray-400">
                {lastMeasurement.date}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-pink-50 rounded-2xl p-3 text-center">
                <div className="text-[10px] text-pink-600 mb-1">📏 قد</div>
                <div className="text-lg font-bold text-pink-900">
                  {lastMeasurement.height}
                </div>
                <div className="text-[9px] text-gray-400">سانتی‌متر</div>
              </div>
              <div className="bg-pink-50 rounded-2xl p-3 text-center">
                <div className="text-[10px] text-pink-600 mb-1">⚖️ وزن</div>
                <div className="text-lg font-bold text-pink-900">
                  {lastMeasurement.weight}
                </div>
                <div className="text-[9px] text-gray-400">کیلوگرم</div>
              </div>
              {lastMeasurement.headSize > 0 && (
                <div className="bg-pink-50 rounded-2xl p-3 text-center">
                  <div className="text-[10px] text-pink-600 mb-1">🔵 دور سر</div>
                  <div className="text-lg font-bold text-pink-900">
                    {lastMeasurement.headSize}
                  </div>
                  <div className="text-[9px] text-gray-400">سانتی‌متر</div>
                </div>
              )}
            </div>

            {/* روند رشد */}
            {measurements.length > 1 && (
              <div className="mt-4 bg-green-50 rounded-2xl p-3 border border-green-100">
                <p className="text-xs text-green-700">
                  📈 رشد قد از اولین اندازه‌گیری:{" "}
                  <span className="font-bold">
                    {heightChange > 0 ? "+" : ""}
                    {heightChange.toFixed(1)} سانتی‌متر
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* نمودار ساده */}
          {measurements.length > 1 && (
            <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm">
              <h3 className="font-bold text-gray-800 text-sm mb-4">
                📈 نمودار رشد قد
              </h3>

              <div className="h-32 flex items-end gap-2">
                {measurements.map((m, idx) => {
                  const maxHeight = Math.max(
                    ...measurements.map((x) => x.height)
                  );
                  const minHeight = Math.min(
                    ...measurements.map((x) => x.height)
                  );
                  const range = maxHeight - minHeight || 1;
                  const barHeight =
                    ((m.height - minHeight) / range) * 100 + 20;

                  return (
                    <div key={m.id} className="flex-1 flex flex-col items-center">
                      <div className="text-[9px] text-gray-600 mb-1">
                        {m.height}
                      </div>
                      <div
                        className="w-full bg-gradient-to-t from-pink-400 to-rose-400 rounded-t-lg transition-all"
                        style={{ height: `${barHeight}%` }}
                      />
                      <div className="text-[8px] text-gray-400 mt-1">
                        {m.date.split("/").slice(1).join("/")}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* تاریخچه */}
          {measurements.length > 1 && (
            <div className="bg-white rounded-3xl p-4 border border-pink-100 shadow-sm">
              <h3 className="font-bold text-gray-800 text-sm mb-3">
                📋 تاریخچه
              </h3>
              <div className="space-y-2">
                {[...measurements].reverse().map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-xs text-gray-700">
                        <span>📏 {m.height} cm</span>
                        <span>⚖️ {m.weight} kg</span>
                        {m.headSize > 0 && <span>🔵 {m.headSize} cm</span>}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">
                        {m.date}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteMeasurement(m.id)}
                      className="text-gray-300 hover:text-red-500 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-3xl p-8 border border-pink-100 shadow-sm text-center">
          <div className="text-5xl mb-3">📏</div>
          <p className="text-sm text-gray-500 mb-4">
            هنوز اندازه‌گیری ثبت نکردی
          </p>
        </div>
      )}

      {/* دکمه ثبت */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-gradient-to-l from-pink-500 to-rose-500 text-white font-bold py-4 rounded-2xl shadow-md active:scale-95 transition-all text-lg"
        >
          ➕ ثبت اندازه‌گیری جدید
        </button>
      )}

      {/* فرم اندازه‌گیری */}
      {showForm && (
        <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-800">📏 اندازه‌گیری جدید</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 text-xl"
            >
              ✕
            </button>
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              قد (سانتی‌متر)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="مثلاً ۹۵"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400"
              dir="ltr"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              وزن (کیلوگرم)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="مثلاً ۱۵"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400"
              dir="ltr"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              دور سر (اختیاری - سانتی‌متر)
            </label>
            <input
              type="number"
              value={headSize}
              onChange={(e) => setHeadSize(e.target.value)}
              placeholder="مثلاً ۴۹"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400"
              dir="ltr"
            />
          </div>

          <button
            onClick={addMeasurement}
            className="w-full bg-gradient-to-l from-pink-500 to-rose-500 text-white font-bold py-3 rounded-2xl active:scale-95 transition-all"
          >
            ✅ ثبت
          </button>
        </div>
      )}

      {/* دکمه AI */}
      <Link
        href="/chat"
        className="block bg-gradient-to-l from-purple-50 to-violet-50 rounded-2xl p-4 border border-purple-200 hover:shadow-md transition-all"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <div className="flex-1">
            <p className="text-xs font-bold text-purple-800">
              دغدغه‌ای داری؟
            </p>
            <p className="text-[10px] text-purple-600 mt-0.5">
              از AI مادریار بپرس
            </p>
          </div>
          <span className="text-purple-400">←</span>
        </div>
      </Link>

      <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 text-xs text-pink-600 text-center">
        💜 رشد کودک، یه سفر قشنگه
      </div>
    </div>
  );
}