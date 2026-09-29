const selfCareCards = [
  {
    title: "برای لحظه‌ای بیشتر پیش خودت",
    description: "یک نفس عمیق، یک لحظه سکوت، فقط برای تو.",
    emoji: "🌿",
  },
  {
    title: "برای وقت‌هایی که فشار زندگی روت زیاده",
    description: "یادت باشه که تو داری تمام تلاشت رو می‌کنی.",
    emoji: "💜",
  },
  {
    title: "برای وقت‌هایی که فکر می‌کنی مادر کافی نیستی",
    description: "کافی بودن یعنی همین که داری تلاش می‌کنی.",
    emoji: "🌸",
  },
];

export default function SelfCarePage() {
  return (
    <div className="space-y-6">
      <header className="pt-4">
        <h1 className="text-2xl font-bold text-purple-800">برای خودم</h1>
        <p className="text-sm text-purple-500 mt-1">
          چند لحظه برای تو
        </p>
      </header>

      <section className="space-y-4">
        {selfCareCards.map((card) => (
          <button
            key={card.title}
            className="w-full text-right bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{card.emoji}</span>
              <div className="flex-1">
                <h2 className="font-semibold text-purple-800 mb-1 leading-relaxed">
                  {card.title}
                </h2>
                <p className="text-sm text-purple-600 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </section>

      <div className="bg-white rounded-2xl p-4 border border-purple-100 text-xs text-gray-500 leading-relaxed">
        این بخش برای حمایت از توست، نه جایگزین کمک تخصصی.
        اگه نیاز به کمک داری، از متخصص کمک بگیر.
      </div>
    </div>
  );
}