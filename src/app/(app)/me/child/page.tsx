"use client";

import Link from "next/link";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState, useEffect } from "react";

type ChildProfile = {
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: string;
};

export default function ChildProfilePage() {
  const [profile, setProfile] = useLocalStorage<ChildProfile | null>(
    "child-profile",
    null
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("دختر");

  useEffect(() => {
    setIsLoaded(true);
    if (profile) {
      setName(profile.name);
      setBirthYear(profile.birthYear);
      setBirthMonth(profile.birthMonth);
      setBirthDay(profile.birthDay);
      setGender(profile.gender);
    } else {
      setEditMode(true);
    }
  }, [profile]);

  const saveProfile = () => {
    if (!name.trim() || !birthYear.trim() || !birthMonth.trim() || !birthDay.trim()) {
      alert("لطفاً همه فیلدها رو پر کن");
      return;
    }
    setProfile({
      name: name.trim(),
      birthYear: birthYear.trim(),
      birthMonth: birthMonth.trim(),
      birthDay: birthDay.trim(),
      gender,
    });
    setEditMode(false);
  };

  const calcAge = (year: string, month: string, day: string) => {
    try {
      const by = parseInt(year);
      const bm = parseInt(month);
      const bd = parseInt(day);

      if (isNaN(by) || isNaN(bm) || isNaN(bd)) return "—";

      const today = new Date()
        .toLocaleDateString("fa-IR")
        .split("/")
        .map((p) => parseInt(p));
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

      if (years > 0) return `${years} سال و ${months} ماه`;
      else if (months > 0) return `${months} ماه و ${days} روز`;
      else return `${days} روز`;
    } catch {
      return "—";
    }
  };

  if (!isLoaded) return null;

  // فرم پروفایل
  if (editMode) {
    return (
      <div className="space-y-4 pb-8">
        <header className="pt-4 text-center space-y-2">
          <h1 className="text-2xl font-bold text-violet-800">
            👧 پروفایل کودک
          </h1>
        </header>

        <Link
          href="/me"
          className="text-xs text-violet-600 flex items-center gap-1"
        >
          → برگشت
        </Link>

        <div className="bg-white rounded-3xl p-5 border border-violet-100 shadow-sm space-y-5">
          {/* اسم */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block font-bold">
              اسم کودک
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلاً رزا"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-400"
            />
          </div>

          {/* تاریخ تولد - سه کادر */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block font-bold">
              تاریخ تولد (شمسی)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <input
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  placeholder="۱۴۰۱"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-center focus:outline-none focus:border-violet-400"
                  dir="ltr"
                />
                <p className="text-[9px] text-gray-400 text-center mt-1">سال</p>
              </div>
              <div>
                <input
                  type="number"
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  placeholder="۰۱"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-center focus:outline-none focus:border-violet-400"
                  dir="ltr"
                  min="1"
                  max="12"
                />
                <p className="text-[9px] text-gray-400 text-center mt-1">ماه</p>
              </div>
              <div>
                <input
                  type="number"
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  placeholder="۱۵"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-center focus:outline-none focus:border-violet-400"
                  dir="ltr"
                  min="1"
                  max="31"
                />
                <p className="text-[9px] text-gray-400 text-center mt-1">روز</p>
              </div>
            </div>
          </div>

          {/* جنسیت */}
          <div>
            <label className="text-xs text-gray-600 mb-2 block font-bold">
              جنسیت
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender("دختر")}
                className={`py-4 rounded-2xl font-bold text-base transition-all ${
                  gender === "دختر"
                    ? "bg-gradient-to-l from-pink-500 to-rose-500 text-white shadow-md scale-105"
                    : "bg-gray-50 text-gray-600 border-2 border-gray-200"
                }`}
              >
                👧 دختر
              </button>
              <button
                type="button"
                onClick={() => setGender("پسر")}
                className={`py-4 rounded-2xl font-bold text-base transition-all ${
                  gender === "پسر"
                    ? "bg-gradient-to-l from-blue-500 to-cyan-500 text-white shadow-md scale-105"
                    : "bg-gray-50 text-gray-600 border-2 border-gray-200"
                }`}
              >
                👦 پسر
              </button>
            </div>
          </div>

          {/* دکمه ذخیره */}
          <button
            onClick={saveProfile}
            className="w-full bg-gradient-to-l from-violet-500 to-purple-500 text-white font-bold py-4 rounded-2xl active:scale-95 transition-all shadow-md"
          >
            ✅ ذخیره
          </button>
        </div>
      </div>
    );
  }

  // نمایش پروفایل
  return (
    <div className="space-y-4 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-violet-800">👧 کودک من</h1>
      </header>

      <Link
        href="/me"
        className="text-xs text-violet-600 flex items-center gap-1"
      >
        → برگشت
      </Link>

      {profile && (
        <>
          {/* کارت پروفایل */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl p-6 border border-violet-100 shadow-sm">
            <div className="text-center space-y-3">
              <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-5xl shadow-sm mx-auto">
                {profile.gender === "دختر" ? "👧" : "👦"}
              </div>
              <h2 className="text-2xl font-bold text-violet-900">
                {profile.name}
              </h2>
              <p className="text-sm text-violet-600">
                🎂{" "}
                {calcAge(
                  profile.birthYear,
                  profile.birthMonth,
                  profile.birthDay
                )}
              </p>
              <p className="text-xs text-violet-500">
                📅 {profile.birthYear}/{profile.birthMonth}/{profile.birthDay}
              </p>
              <button
                onClick={() => setEditMode(true)}
                className="text-xs text-violet-600 underline mt-2"
              >
                ✏️ ویرایش پروفایل
              </button>
            </div>
          </div>

          {/* اطلاعات */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-gray-700 px-1">
              📋 اطلاعات کودک
            </h2>

            <div className="bg-white rounded-2xl border border-violet-100 p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">👧 اسم</span>
                <span className="text-sm font-bold text-violet-800">
                  {profile.name}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-sm text-gray-600">🎂 سن</span>
                <span className="text-sm font-bold text-violet-800">
                  {calcAge(
                    profile.birthYear,
                    profile.birthMonth,
                    profile.birthDay
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-sm text-gray-600">📅 تاریخ تولد</span>
                <span className="text-sm font-bold text-violet-800">
                  {profile.birthYear}/{profile.birthMonth}/{profile.birthDay}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-sm text-gray-600">
                  {profile.gender === "دختر" ? "👧 جنسیت" : "👦 جنسیت"}
                </span>
                <span className="text-sm font-bold text-violet-800">
                  {profile.gender}
                </span>
              </div>
            </div>
          </section>

          {/* دسترسی سریع */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-gray-700 px-1">
              🔗 دسترسی سریع
            </h2>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/child/growth"
                className="bg-pink-50 rounded-2xl p-4 text-center hover:bg-pink-100 transition-all active:scale-95"
              >
                <div className="text-3xl mb-2">📊</div>
                <p className="text-xs font-bold text-pink-800">
                  گهواره رشد
                </p>
              </Link>

              <Link
                href="/child/vaccines"
                className="bg-cyan-50 rounded-2xl p-4 text-center hover:bg-cyan-100 transition-all active:scale-95"
              >
                <div className="text-3xl mb-2">💉</div>
                <p className="text-xs font-bold text-cyan-800">واکسن‌ها</p>
              </Link>

              <Link
                href="/child/memories"
                className="bg-purple-50 rounded-2xl p-4 text-center hover:bg-purple-100 transition-all active:scale-95"
              >
                <div className="text-3xl mb-2">📸</div>
                <p className="text-xs font-bold text-purple-800">خاطرات</p>
              </Link>

              <Link
                href="/child/solve"
                className="bg-amber-50 rounded-2xl p-4 text-center hover:bg-amber-100 transition-all active:scale-95"
              >
                <div className="text-3xl mb-2">🧩</div>
                <p className="text-xs font-bold text-amber-800">
                  حل مسئله
                </p>
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}