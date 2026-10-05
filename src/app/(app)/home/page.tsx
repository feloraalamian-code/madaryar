import Link from "next/link";

const sections = [
  {
    href: "/home/cooking",
    title: "آشپزی",
    description: "امروز چی بپزم؟",
    emoji: "🍳",
    bgColor: "bg-gradient-to-l from-amber-50 to-orange-50",
    borderColor: "border-amber-100",
    textColor: "text-amber-800",
    descColor: "text-amber-600",
    arrowColor: "text-amber-400",
  },
  {
    href: "/home/cleaning",
    title: "تمیزی و نظم",
    description: "چیکار کنم تو خونه؟",
    emoji: "🧹",
    bgColor: "bg-gradient-to-l from-cyan-50 to-blue-50",
    borderColor: "border-cyan-100",
    textColor: "text-cyan-800",
    descColor: "text-cyan-600",
    arrowColor: "text-cyan-400",
  },
  {
    href: "/home/inventory",
    title: "موجودی منزل",
    description: "چی دارم، چی کم دارم",
    emoji: "📦",
    bgColor: "bg-gradient-to-l from-violet-50 to-purple-50",
    borderColor: "border-violet-100",
    textColor: "text-violet-800",
    descColor: "text-violet-600",
    arrowColor: "text-violet-400",
  },
  {
    href: "/home/finance",
    title: "دخل و خرج",
    description: "مدیریت خرج خونه",
    emoji: "💰",
    bgColor: "bg-gradient-to-l from-green-50 to-emerald-50",
    borderColor: "border-green-100",
    textColor: "text-green-800",
    descColor: "text-green-600",
    arrowColor: "text-green-400",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-3xl font-bold text-blue-800">🏠 خانه</h1>
        <p className="text-sm text-gray-500">مدیریت و نظم خانه</p>
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

      <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 text-xs text-blue-600 leading-relaxed text-center">
        💙 خانه‌ات، پناهگاه توست.
      </div>
    </div>
  );
}