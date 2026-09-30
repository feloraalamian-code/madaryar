import Link from "next/link";

const sections = [
  {
    href: "/home/cleaning/guide",
    title: "راهنمای تمیزی",
    description: "چطور چی رو تمیز کنیم",
    emoji: "🧽",
    bgColor: "bg-gradient-to-l from-cyan-50 to-blue-50",
    borderColor: "border-cyan-100",
    textColor: "text-cyan-800",
    descColor: "text-cyan-600",
    arrowColor: "text-cyan-400",
  },
  {
    href: "/home/cleaning/secrets",
    title: "راز کدبانو",
    description: "نکته‌های روزانه",
    emoji: "✨",
    bgColor: "bg-gradient-to-l from-blue-50 to-indigo-50",
    borderColor: "border-blue-100",
    textColor: "text-blue-800",
    descColor: "text-blue-600",
    arrowColor: "text-blue-400",
  },
  {
    href: "/home/cleaning/clothes",
    title: "لباس‌ها",
    description: "شستن، اتو و کمد",
    emoji: "👕",
    bgColor: "bg-gradient-to-l from-violet-50 to-purple-50",
    borderColor: "border-violet-100",
    textColor: "text-violet-800",
    descColor: "text-violet-600",
    arrowColor: "text-violet-400",
  },
];

export default function CleaningPage() {
  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-cyan-800">
          🧽 تمیزی
        </h1>
        <p className="text-sm text-gray-500">
          راهنمای تمیز کردن خانه
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

      <div className="bg-cyan-50 rounded-2xl p-4 border border-cyan-100 text-xs text-cyan-600 leading-relaxed text-center">
        💙 خونه‌ی تمیز، آرامش می‌آره.
      </div>
    </div>
  );
}