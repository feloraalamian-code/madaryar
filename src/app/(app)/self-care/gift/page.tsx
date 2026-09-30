import giftsData from "@/content/self-care/gifts.json";

export default function GiftPage() {
  const todayIndex =
    Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % giftsData.gifts.length;
  const todayGift = giftsData.gifts[todayIndex];

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-purple-800">
          🎁 جعبه هدیه
        </h1>
        <p className="text-sm text-gray-500">
          یه پیام برای امروزت
        </p>
      </header>

      <section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100 shadow-sm">
        <div className="text-center space-y-6">
          <div className="text-6xl">🎁</div>

          <div className="w-16 h-1 bg-purple-200 rounded-full mx-auto" />

          <p className="text-lg text-purple-900 leading-loose px-2">
            {todayGift.text}
          </p>

          <div className="w-16 h-1 bg-purple-200 rounded-full mx-auto" />

          <p className="text-xs text-purple-400">
            💜 با عشق تقدیم به تو مادر عزیز
          </p>
        </div>
      </section>

      <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 text-xs text-purple-600 leading-relaxed text-center">
        💜 این بخش برای حمایت از توست، نه جایگزین کمک تخصصی.
      </div>
    </div>
  );
}