"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const mainCards = [
  {
    href: "/child/growth",
    title: "گهواره رشد",
    description: "قد، وزن و نمودار رشد کودک",
    emoji: "📊",
    bgColor: "bg-gradient-to-l from-pink-100 via-rose-100 to-purple-100",
    borderColor: "border-pink-200",
    textColor: "text-pink-900",
    descColor: "text-pink-700",
    arrowColor: "text-pink-500",
  },
  {
    href: "/child/solve",
    title: "حل مسئله",
    description: "مشکل داری؟ راه‌حل بگیر",
    emoji: "🧩",
    bgColor: "bg-gradient-to-l from-amber-100 via-orange-100 to-yellow-100",
    borderColor: "border-amber-200",
    textColor: "text-amber-900",
    descColor: "text-amber-700",
    arrowColor: "text-amber-500",
  },
  {
    href: "/child/memories",
    title: "خاطرات کودک",
    description: "لحظه‌های قشنگ رو ثبت کن",
    emoji: "📸",
    bgColor: "bg-gradient-to-l from-purple-100 via-pink-100 to-rose-100",
    borderColor: "border-purple-200",
    textColor: "text-purple-900",
    descColor: "text-purple-700",
    arrowColor: "text-purple-500",
  },
];

const groups = [
  {
    id: "growth-stages",
    icon: "🌱",
    title: "مراحل رشد کودک",
    description: "از بارداری تا نوجوانی",
    items: [
      {
        href: "/child/pregnancy",
        title: "بارداری و زایمان",
        description: "از بارداری تا بعد از زایمان",
        emoji: "🤰",
        bgColor: "bg-gradient-to-l from-pink-50 to-rose-50",
        borderColor: "border-pink-100",
        textColor: "text-pink-800",
        descColor: "text-pink-600",
      },
      {
        href: "/child/under-1",
        title: "زیر ۱ سال",
        description: "شیردهی، خواب و رشد",
        emoji: "🍼",
        bgColor: "bg-gradient-to-l from-rose-50 to-orange-50",
        borderColor: "border-rose-100",
        textColor: "text-rose-800",
        descColor: "text-rose-600",
      },
      {
        href: "/child/1-3",
        title: "۱-۳ سال",
        description: "راه رفتن، حرف زدن و پوشک",
        emoji: "👶",
        bgColor: "bg-gradient-to-l from-amber-50 to-yellow-50",
        borderColor: "border-amber-100",
        textColor: "text-amber-800",
        descColor: "text-amber-600",
      },
      {
        href: "/child/3-6",
        title: "۳-۶ سال",
        description: "مدرسه، ترس‌ها و خواب مستقل",
        emoji: "🧒",
        bgColor: "bg-gradient-to-l from-lime-50 to-green-50",
        borderColor: "border-lime-100",
        textColor: "text-lime-800",
        descColor: "text-lime-700",
      },
      {
        href: "/child/6-12",
        title: "۶-۱۲ سال",
        description: "مدرسه، دوست‌یابی و مسئولیت",
        emoji: "👦",
        bgColor: "bg-gradient-to-l from-cyan-50 to-blue-50",
        borderColor: "border-cyan-100",
        textColor: "text-cyan-800",
        descColor: "text-cyan-600",
      },
    ],
  },
  {
    id: "health",
    icon: "🩺",
    title: "سلامت و مراقبت",
    description: "واکسن، شیردهی و سلامت",
    items: [
      {
        href: "/child/vaccines",
        title: "واکسن‌ها",
        description: "برنامه واکسیناسیون کودک",
        emoji: "💉",
        bgColor: "bg-gradient-to-l from-cyan-50 to-sky-50",
        borderColor: "border-cyan-100",
        textColor: "text-cyan-800",
        descColor: "text-cyan-600",
      },
      {
        href: "/child/breastfeeding",
        title: "شیردهی",
        description: "راهنما و تایمر",
        emoji: "🍼",
        bgColor: "bg-gradient-to-l from-pink-50 to-rose-50",
        borderColor: "border-pink-100",
        textColor: "text-pink-800",
        descColor: "text-pink-600",
      },
    ],
  },
  {
    id: "upbringing",
    icon: "💜",
    title: "تربیت و رفتار",
    description: "احساسات، رفتار و تربیت",
    items: [
      {
        href: "/child/emotions",
        title: "احساسات کودک",
        description: "چطور با هیجانات کنار بیاد",
        emoji: "💜",
        bgColor: "bg-gradient-to-l from-fuchsia-50 to-pink-50",
        borderColor: "border-fuchsia-100",
        textColor: "text-fuchsia-800",
        descColor: "text-fuchsia-600",
      },
      {
        href: "/child/emotional-regulation",
        title: "تنظیم هیجانی",
        description: "چطور آروم بشه و کنترل کنه",
        emoji: "🧘",
        bgColor: "bg-gradient-to-l from-teal-50 to-emerald-50",
        borderColor: "border-teal-100",
        textColor: "text-teal-800",
        descColor: "text-teal-600",
      },
      {
        href: "/child/screen",
        title: "گوشی و تلویزیون",
        description: "چطور مدیریت کنیم",
        emoji: "📱",
        bgColor: "bg-gradient-to-l from-violet-50 to-purple-50",
        borderColor: "border-violet-100",
        textColor: "text-violet-800",
        descColor: "text-violet-600",
      },
      {
        href: "/child/books",
        title: "کتاب‌های تربیتی",
        description: "کتاب‌های پیشنهادی",
        emoji: "📚",
        bgColor: "bg-gradient-to-l from-indigo-50 to-blue-50",
        borderColor: "border-indigo-100",
        textColor: "text-indigo-800",
        descColor: "text-indigo-600",
      },
    ],
  },
];

export default function ChildPage() {
  const [openGroups, setOpenGroups] = useLocalStorage<string[]>(
    "child-open-groups",
    ["growth-stages"]
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  if (!isLoaded) return null;

  return (
    <div className="space-y-4 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-3xl font-bold text-pink-800">👶 کودک</h1>
        <p className="text-sm text-gray-500">از بارداری تا نوجوانی</p>
      </header>

      {/* کارت‌های اصلی */}
      <section className="space-y-3">
        {mainCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`block rounded-3xl ${card.bgColor} border ${card.borderColor} p-5 shadow-md hover:shadow-lg transition-all active:scale-95`}
          >
            <div className="flex items-center gap-4">
              <span className={`${card.arrowColor} text-xl`}>←</span>

              <div className="flex-1 text-right">
                <h2 className={`text-xl font-bold ${card.textColor}`}>
                  {card.title}
                </h2>
                <p className={`text-sm ${card.descColor} mt-1`}>
                  {card.description}
                </p>
              </div>

              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <span className="text-2xl">{card.emoji}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* جداکننده */}
      <div className="flex items-center gap-3 px-2">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-[10px] text-gray-400">محتوای آموزشی</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* گروه‌ها */}
      <section className="space-y-3">
        {groups.map((group) => {
          const isOpen = openGroups.includes(group.id);
          const itemCount = group.items.length;

          return (
            <div
              key={group.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-gray-50/50 transition-colors"
              >
                <span className="text-3xl">{group.icon}</span>
                <div className="flex-1">
                  <h2 className="font-bold text-gray-800">{group.title}</h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {group.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {itemCount}
                  </span>
                  <span
                    className={`text-gray-400 text-lg transition-transform ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  >
                    ←
                  </span>
                </div>
              </button>

              {isOpen && (
                <div className="px-3 pb-3 space-y-2 border-t border-gray-100 pt-3">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block rounded-2xl ${item.bgColor} border ${item.borderColor} p-3 hover:shadow-md transition-all active:scale-95`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`${item.descColor} text-lg opacity-60`}
                        >
                          ←
                        </span>

                        <div className="flex-1 text-right">
                          <h3
                            className={`font-bold text-sm ${item.textColor}`}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={`text-[10px] ${item.descColor} mt-0.5`}
                          >
                            {item.description}
                          </p>
                        </div>

                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <span className="text-lg">{item.emoji}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 text-xs text-pink-600 leading-relaxed text-center">
        💕 همراه تو در مسیر مادر بودن.
      </div>
    </div>
  );
}