import Link from "next/link";

const sections = [
  {
    href: "/self-care",
    title: "وقت خودم",
    description: "هدیه، چالش و تفریح",
    emoji: "💜",
    bgColor: "bg-gradient-to-l from-purple-100 to-pink-100",
    borderColor: "border-purple-200",
    textColor: "text-purple-900",
    descColor: "text-purple-700",
    arrowColor: "text-purple-500",
  },
  {
    href: "/home",
    title: "خانه",
    description: "آشپزی، تمیزی و مدیریت",
    emoji: "🏠",
    bgColor: "bg-gradient-to-l from-blue-100 to-cyan-100",
    borderColor: "border-blue-200",
    textColor: "text-blue-900",
    descColor: "text-blue-700",
    arrowColor: "text-blue-500",
  },
  {
    href: "/child",
    title: "کودک",
    description: "رشد و تربیت",
    emoji: "👶",
    bgColor: "bg-gradient-to-l from-amber-100 to-orange-100",
    borderColor: "border-amber-200",
    textColor: "text-amber-900",
    descColor: "text-amber-700",
    arrowColor: "text-amber-500",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-12 bg-gradient-to-b from-white via-purple-50/20 to-purple-50/40">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <header className="text-center space-y-4 py-8">
          <h1 className="text-5xl font-bold text-purple-800">
            🌸 مادریار
          </h1>
          <p className="text-base text-gray-500 leading-relaxed">
            همراه تو در مسیر مادر بودن
          </p>
        </header>

        {/* Cards */}
        <section className="space-y-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className={`block rounded-3xl ${section.bgColor} border ${section.borderColor} p-6 shadow-sm hover:shadow-lg transition-all active:scale-95`}
            >
              <div className="flex items-center gap-4">
                {/* Arrow on left (RTL) */}
                <span className={`${section.arrowColor} text-2xl`}>←</span>

                {/* Text content */}
                <div className="flex-1 text-right">
                  <h2 className={`text-2xl font-bold ${section.textColor}`}>
                    {section.title}
                  </h2>
                  <p className={`text-sm ${section.descColor} mt-1.5`}>
                    {section.description}
                  </p>
                </div>

                {/* Icon on right */}
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <span className="text-3xl">{section.emoji}</span>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Footer */}
        <footer className="text-center pt-6">
          <p className="text-xs text-gray-400">💜 نسخه MVP</p>
        </footer>
      </div>
    </main>
  );
}