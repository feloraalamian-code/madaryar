import data from "@/content/child/books.json";

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="text-center pt-8 pb-4 px-4">
        <div className="flex items-center justify-center gap-2">
          <span className="text-4xl">{data.emoji}</span>
          <h1 className="text-2xl font-bold text-gray-800">{data.title}</h1>
        </div>
        <p className="text-sm text-gray-500 mt-2">{data.subtitle}</p>
      </header>

      <main className="max-w-md mx-auto px-4 space-y-4">
        {data.cards.map((card) => (
          <details
            key={card.id}
            className="bg-white rounded-2xl shadow-sm overflow-hidden group"
          >
            <summary className="flex items-center gap-3 p-4 cursor-pointer list-none">
              <span className="text-3xl">{card.icon}</span>
              <div className="flex-1">
                <h2 className="font-bold text-gray-800">{card.title}</h2>
                <p className="text-xs text-gray-500 mt-1">{card.subtitle}</p>
              </div>
              <span className="text-gray-400 group-open:rotate-90 transition-transform">
                ←
              </span>
            </summary>

            <div className="px-4 pb-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 mt-4 leading-7">
                {card.startText}
              </p>

              <div className="mt-4 space-y-4">
                {card.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-gray-700 text-sm mb-2">
                      ● {section.title}
                    </h3>
                    <ul className="space-y-1 pr-4 border-r-2 border-gray-100">
                      {section.items.map((item, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-600 flex items-start gap-2"
                        >
                          <span className="text-gray-300 mt-1">├─</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-amber-50 border-r-4 border-amber-300 rounded p-3">
                <p className="text-xs font-bold text-amber-700 mb-1">
                  💡 نکته:
                </p>
                <p className="text-sm text-gray-700 leading-6">{card.tip}</p>
              </div>

              <p className="text-center text-sm text-pink-500 mt-4">
                ❤️ {card.footer}
              </p>
            </div>
          </details>
        ))}
      </main>

      <footer className="text-center text-xs text-gray-400 mt-8 px-4">
        ❤️ همراه تو در مسیر مادر بودن
      </footer>
    </div>
  );
}