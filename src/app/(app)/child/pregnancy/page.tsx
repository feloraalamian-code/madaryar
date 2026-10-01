import Link from "next/link";

const sections = [
  {
    href: "/child/pregnancy/first-trimester",
    title: "سه ماهه اول",
    description: "تهوع، خستگی و تغذیه",
    emoji: "🌸",
    bgColor: "bg-gradient-to-l from-pink-50 to-rose-50",
    borderColor: "border-pink-100",
    textColor: "text-pink-800",
    descColor: "text-pink-600",
    arrowColor: "text-pink-400",
  },
  {
    href: "/child/pregnancy/second-trimester",
    title: "سه ماهه دوم",
    description: "انرژی، حرکات جنین",
    emoji: "🌺",
    bgColor: "bg-gradient-to-l from-rose-50 to-fuchsia-50",
    borderColor: "border-rose-100",
    textColor: "text-rose-800",
    descColor: "text-rose-600",
    arrowColor: "text-rose-400",
  },
  {
    href: "/child/pregnancy/third-trimester",
    title: "سه ماهه سوم",
    description: "سنگینی، خواب، آماده‌سازی",
    emoji: "🌼",
    bgColor: "bg-gradient-to-l from-fuchsia-50 to-purple-50",
    borderColor: "border-fuchsia-100",
    textColor: "text-fuchsia-800",
    descColor: "text-fuchsia-600",
    arrowColor: "text-fuchsia-400",
  },
  {
    href: "/child/pregnancy/danger-signs",
    title: "علائم خطر",
    description: "کی بریم پزشک",
    emoji: "⚠️",
    bgColor: "bg-gradient-to-l from-red-50 to-rose-50",
    borderColor: "border-red-100",
    textColor: "text-red-800",
    descColor: "text-red-600",
    arrowColor: "text-red-400",
  },
  {
    href: "/child/pregnancy/preparation",
    title: "آماده‌سازی زایمان",
    description: "چکاپ‌ها، ویتامین‌ها",
    emoji: "👶",
    bgColor: "bg-gradient-to-l from-amber-50 to-yellow-50",
    borderColor: "border-amber-100",
    textColor: "text-amber-800",
    descColor: "text-amber-600",
    arrowColor: "text-amber-400",
  },
  {
    href: "/child/pregnancy/birth",
    title: "زایمان",
    description: "علائم شروع، کیسه زایمان",
    emoji: "🏥",
    bgColor: "bg-gradient-to-l from-cyan-50 to-blue-50",
    borderColor: "border-cyan-100",
    textColor: "text-cyan-800",
    descColor: "text-cyan-600",
    arrowColor: "text-cyan-400",
  },
  {
    href: "/child/pregnancy/after-birth",
    title: "بعد از زایمان",
    description: "مراقبت از خودت",
    emoji: "💜",
    bgColor: "bg-gradient-to-l from-violet-50 to-purple-50",
    borderColor: "border-violet-100",
    textColor: "text-violet-800",
    descColor: "text-violet-600",
    arrowColor: "text-violet-400",
  },
];

export default function PregnancyPage() {
  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-pink-800">
          🤰 بارداری و زایمان
        </h1>
        <p className="text-sm text-gray-500">
          از بارداری تا بعد از زایمان
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
        💕 تو داری یه معجزه می‌سازی.
      </div>
    </div>
  );
}