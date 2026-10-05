import Link from "next/link";

const sections = [
  {
    href: "/self-care/gift",
    title: "جعبه هدیه",
    description: "یه پیام برای امروزت",
    emoji: "🎁",
    bgColor: "bg-gradient-to-l from-purple-50 to-pink-50",
    borderColor: "border-purple-100",
    textColor: "text-purple-800",
    descColor: "text-purple-600",
    arrowColor: "text-purple-400",
  },
  {
    href: "/self-care/challenge",
    title: "چالش روزانه",
    description: "یه کار کوچیک برای خودت",
    emoji: "🎯",
    bgColor: "bg-gradient-to-l from-blue-50 to-indigo-50",
    borderColor: "border-blue-100",
    textColor: "text-blue-800",
    descColor: "text-blue-600",
    arrowColor: "text-blue-400",
  },
  {
    href: "/self-care/breathing",
    title: "تمرین تنفس",
    description: "۶ تمرین برای آرامش",
    emoji: "🌬️",
    bgColor: "bg-gradient-to-l from-teal-50 to-cyan-50",
    borderColor: "border-teal-100",
    textColor: "text-teal-800",
    descColor: "text-teal-600",
    arrowColor: "text-teal-400",
  },
  {
    href: "/self-care/fun",
    title: "تفریح",
    description: "کتاب، پادکست و فیلم",
    emoji: "🎉",
    bgColor: "bg-gradient-to-l from-pink-50 to-rose-50",
    borderColor: "border-pink-100",
    textColor: "text-pink-800",
    descColor: "text-pink-600",
    arrowColor: "text-pink-400",
  },
  {
    href: "/self-care/heart",
    title: "قلب زنانه",
    description: "زنانگی و خودمراقبتی",
    emoji: "💜",
    bgColor: "bg-gradient-to-l from-violet-50 to-purple-50",
    borderColor: "border-violet-100",
    textColor: "text-violet-800",
    descColor: "text-violet-600",
    arrowColor: "text-violet-400",
  },
];

export default function SelfCarePage() {
  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-3xl font-bold text-purple-800">
          🌸 آرامش من
        </h1>
        <p className="text-sm text-gray-500">
          چند لحظه فقط برای تو
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

      <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 text-xs text-purple-600 leading-relaxed text-center">
        💜 این بخش برای حمایت از توست، نه جایگزین کمک تخصصی.
      </div>
    </div>
  );
}