import Link from "next/link";

const sections = [
  {
    href: "/home/beauty/layout",
    title: "چیدمان ساده",
    description: "چطور خونه رو بچینیم",
    emoji: "🛋️",
    bgColor: "bg-gradient-to-l from-green-50 to-emerald-50",
    borderColor: "border-green-100",
    textColor: "text-green-800",
    descColor: "text-green-600",
    arrowColor: "text-green-400",
  },
  {
    href: "/home/beauty/plants",
    title: "گیاه‌ها",
    description: "گیاهان آپارتمانی",
    emoji: "🌱",
    bgColor: "bg-gradient-to-l from-lime-50 to-green-50",
    borderColor: "border-lime-100",
    textColor: "text-lime-800",
    descColor: "text-lime-700",
    arrowColor: "text-lime-500",
  },
  {
    href: "/home/beauty/feeling",
    title: "حس خانه",
    description: "عطر، نور و آرامش",
    emoji: "🏡",
    bgColor: "bg-gradient-to-l from-teal-50 to-cyan-50",
    borderColor: "border-teal-100",
    textColor: "text-teal-800",
    descColor: "text-teal-600",
    arrowColor: "text-teal-400",
  },
];

export default function BeautyPage() {
  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-green-800">
          🌿 زیبایی خانه
        </h1>
        <p className="text-sm text-gray-500">
          چیدمان، گیاه و آرامش
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

      <div className="bg-green-50 rounded-2xl p-4 border border-green-100 text-xs text-green-600 leading-relaxed text-center">
        💚 خونه‌ی قشنگ، حال آدم رو خوب می‌کنه.
      </div>
    </div>
  );
}