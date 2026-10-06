"use client";

import Link from "next/link";

const sections = [
  {
    href: "/me/child",
    title: "کودک من",
    description: "پروفایل، گهواره، واکسن",
    emoji: "👧",
    bgColor: "bg-gradient-to-l from-violet-50 to-purple-50",
    borderColor: "border-violet-100",
    textColor: "text-violet-800",
    descColor: "text-violet-600",
    arrowColor: "text-violet-400",
  },
  {
    href: "/child/growth",
    title: "گهواره رشد",
    description: "قد، وزن و نمودار رشد",
    emoji: "📊",
    bgColor: "bg-gradient-to-l from-pink-50 to-rose-50",
    borderColor: "border-pink-100",
    textColor: "text-pink-800",
    descColor: "text-pink-600",
    arrowColor: "text-pink-400",
  },
  {
    href: "/me/reminders",
    title: "یادآورها",
    description: "کارهای روزانه",
    emoji: "🔔",
    bgColor: "bg-gradient-to-l from-cyan-50 to-sky-50",
    borderColor: "border-cyan-100",
    textColor: "text-cyan-800",
    descColor: "text-cyan-600",
    arrowColor: "text-cyan-400",
  },
  {
    href: "/me/challenges",
    title: "چالش‌ها",
    description: "چالش‌های ۷ روزه",
    emoji: "🎯",
    bgColor: "bg-gradient-to-l from-amber-50 to-orange-50",
    borderColor: "border-amber-100",
    textColor: "text-amber-800",
    descColor: "text-amber-600",
    arrowColor: "text-amber-400",
  },
];

export default function MePage() {
  return (
    <div className="space-y-4 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-3xl font-bold text-violet-800">👩‍👧 مادریار من</h1>
        <p className="text-sm text-gray-500">اطلاعات شخصی تو</p>
      </header>

      <section className="space-y-3">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className={`block rounded-3xl ${section.bgColor} border ${section.borderColor} p-5 shadow-sm hover:shadow-lg transition-all active:scale-95`}
          >
            <div className="flex items-center gap-4">
              <span className={`${section.arrowColor} text-xl`}>←</span>

              <div className="flex-1 text-right">
                <h2 className={`text-xl font-bold ${section.textColor}`}>
                  {section.title}
                </h2>
                <p className={`text-sm ${section.descColor} mt-1`}>
                  {section.description}
                </p>
              </div>

              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <span className="text-2xl">{section.emoji}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <div className="bg-violet-50 rounded-2xl p-4 border border-violet-100 text-xs text-violet-600 text-center">
        💜 اینجا اطلاعات شخصی تو نگه‌داری می‌شه
      </div>
    </div>
  );
}