import Link from "next/link";

const sections = [
  {
    href: "/home",
    title: "خانه",
    description: "کارهای روزمره و موجودی خانه",
    emoji: "🏠",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
    textColor: "text-blue-800",
  },
  {
    href: "/child",
    title: "کودک",
    description: "رشد، واکسن و سلامت کودک",
    emoji: "👶",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
    textColor: "text-amber-800",
  },
  {
    href: "/self-care",
    title: "برای خودم",
    description: "چند لحظه برای خودت",
    emoji: "💚",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100",
    textColor: "text-purple-800",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gradient-to-b from-white to-purple-50/30">
      <div className="w-full max-w-md space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-purple-800">مادریار</h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            همراه تو در مدیریت خانه و کودک
          </p>
        </header>

        <section className="space-y-3">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className={`flex items-center gap-4 p-5 rounded-2xl border ${section.bgColor} ${section.borderColor} shadow-sm hover:shadow-md transition-shadow`}
            >
              <span className="text-4xl">{section.emoji}</span>
              <div className="flex-1 text-right">
                <h2 className={`font-bold text-lg ${section.textColor}`}>
                  {section.title}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {section.description}
                </p>
              </div>
              <span className="text-gray-400 text-xl">←</span>
            </Link>
          ))}
        </section>

        <footer className="text-center pt-4">
          <p className="text-xs text-gray-400">
            نسخه MVP — به زودی امکانات بیشتر
          </p>
        </footer>
      </div>
    </main>
  );
}