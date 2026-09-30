import Link from "next/link";

export default function HeartPage() {
  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-purple-800">
          💜 قلب زنانه
        </h1>
        <p className="text-sm text-gray-500">
          برای خودت و مادر بودنت
        </p>
      </header>

      <section className="space-y-4">
        <Link
          href="/self-care/heart/femininity"
          className="block rounded-3xl bg-gradient-to-l from-pink-50 to-rose-50 border border-pink-100 p-6 shadow-sm hover:shadow-lg transition-all active:scale-95"
        >
          <div className="flex items-center gap-4">
            <span className="text-pink-400 text-2xl">←</span>
            <div className="flex-1 text-right">
              <h2 className="text-xl font-bold text-pink-800">زنانگی</h2>
              <p className="text-sm text-pink-600 mt-1">
                خودمراقبتی و آرامش
              </p>
            </div>
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <span className="text-2xl">🌸</span>
            </div>
          </div>
        </Link>

        <Link
          href="/self-care/heart/motherhood"
          className="block rounded-3xl bg-gradient-to-l from-purple-50 to-violet-50 border border-purple-100 p-6 shadow-sm hover:shadow-lg transition-all active:scale-95"
        >
          <div className="flex items-center gap-4">
            <span className="text-purple-400 text-2xl">←</span>
            <div className="flex-1 text-right">
              <h2 className="text-xl font-bold text-purple-800">مادری</h2>
              <p className="text-sm text-purple-600 mt-1">
                چالش‌ها و لحظه‌های مادری
              </p>
            </div>
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              <span className="text-2xl">👩‍🍼</span>
            </div>
          </div>
        </Link>
      </section>

      <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 text-xs text-purple-600 leading-relaxed text-center">
        💜 تو مهمی، نه فقط به عنوان مادر، بلکه به عنوان خودت.
      </div>
    </div>
  );
}