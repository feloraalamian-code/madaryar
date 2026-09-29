import Link from "next/link";
import breathingData from "@/content/self-care/breathing.json";

export default function BreathingPage() {
  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 flex items-center gap-3">
        <Link
          href="/self-care"
          className="text-gray-400 hover:text-purple-600 transition-colors"
        >
          ←
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-purple-800">
            🌬️ تمرین‌های تنفس
          </h1>
          <p className="text-sm text-gray-500 mt-1">چند دقیقه آرامش</p>
        </div>
      </header>

      <section className="space-y-3">
        {breathingData.exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{exercise.icon}</span>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{exercise.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {exercise.subtitle}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 space-y-1.5 mb-3">
              {exercise.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-xs text-gray-400 mt-1">
                    {index + 1}.
                  </span>
                  <p className="text-sm text-gray-700 flex-1">{step}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>🔁 {exercise.repeat}</span>
              <span>⏱️ {exercise.duration}</span>
              <span>💜 {exercise.purpose}</span>
            </div>
          </div>
        ))}
      </section>

      <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 text-xs text-purple-600 leading-relaxed">
        💜 این بخش برای حمایت از توست.
      </div>
    </div>
  );
}