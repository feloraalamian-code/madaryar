import Link from "next/link";

const sections = [
  {
    href: "/child/pregnancy",
    title: "بارداری و زایمان",
    description: "از بارداری تا بعد از زایمان",
    emoji: "🤰",
    bgColor: "bg-gradient-to-l from-pink-50 to-rose-50",
    borderColor: "border-pink-100",
    textColor: "text-pink-800",
    descColor: "text-pink-600",
    arrowColor: "text-pink-400",
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
    arrowColor: "text-rose-400",
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
    arrowColor: "text-amber-400",
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
    arrowColor: "text-lime-500",
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
    arrowColor: "text-cyan-400",
  },
  {
    href: "/child/screen",
    title: "گوشی و تلویزیون",
    description: "چطور جدا کنیم",
    emoji: "📱",
    bgColor: "bg-gradient-to-l from-violet-50 to-purple-50",
    borderColor: "border-violet-100",
    textColor: "text-violet-800",
    descColor: "text-violet-600",
    arrowColor: "text-violet-400",
  },
  {
    href: "/child/emotions",
    title: "احساسات کودک",
    description: "چطور با هیجانات کنار بیاد",
    emoji: "💜",
    bgColor: "bg-gradient-to-l from-fuchsia-50 to-pink-50",
    borderColor: "border-fuchsia-100",
    textColor: "text-fuchsia-800",
    descColor: "text-fuchsia-600",
    arrowColor: "text-fuchsia-400",
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
    arrowColor: "text-teal-400",
  },
  {
    href: "/child/books",
    title: "کتاب‌های تربیتی",
    description: "۱۵ کتاب پیشنهادی",
    emoji: "📚",
    bgColor: "bg-gradient-to-l from-indigo-50 to-blue-50",
    borderColor: "border-indigo-100",
    textColor: "text-indigo-800",
    descColor: "text-indigo-600",
    arrowColor: "text-indigo-400",
  },
];

export default function ChildPage() {
  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-3xl font-bold text-pink-800">👶 کودک</h1>
        <p className="text-sm text-gray-500">
          از بارداری تا نوجوانی
        </p>
      </header>

      <section className="space-y-4">
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

      <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 text-xs text-pink-600 leading-relaxed text-center">
        💕 همراه تو در مسیر مادر بودن.
      </div>
    </div>
  );
}