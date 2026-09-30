import challengesData from "@/content/self-care/challenges.json";

export default function ChallengePage() {
  const todayIndex =
    Math.floor(Date.now() / (1000 * 60 * 60 * 24)) %
    challengesData.challenges.length;
  const todayChallenge = challengesData.challenges[todayIndex];

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-blue-800">
          🎯 چالش روزانه
        </h1>
        <p className="text-sm text-gray-500">
          یه کار کوچیک برای خودت
        </p>
      </header>

      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 shadow-sm">
        <div className="text-center space-y-6">
          <div className="text-6xl">{todayChallenge.icon}</div>

          <div className="w-16 h-1 bg-blue-200 rounded-full mx-auto" />

          <p className="text-lg text-blue-900 leading-loose px-2">
            {todayChallenge.text}
          </p>

          <div className="w-16 h-1 bg-blue-200 rounded-full mx-auto" />

          <p className="text-xs text-blue-400">
            💙 امروز فقط همین یه کار کوچیک
          </p>
        </div>
      </section>

      <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 text-xs text-blue-600 leading-relaxed text-center">
        💙 قدم کوچیک، بهتر از هیچ قدمیه.
      </div>
    </div>
  );
}