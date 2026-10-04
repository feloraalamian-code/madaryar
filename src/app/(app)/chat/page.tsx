"use client";

import { useState } from "react";
import aiQuestions from "@/content/aiQuestions.json";

export default function ChatPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // انتخاب سوال و گرفتن جواب از AI
  const handleQuestionSelect = async (question: any) => {
    setSelectedQuestion(question);
    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.question,
          context: question.context,
        }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("متاسفانه یه مشکلی پیش اومد. دوباره امتحان کن.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* هدر */}
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-pink-800">🤖 دستیار مادریار</h1>
        <p className="text-sm text-gray-500">
          {selectedCategory
            ? "یه سوال انتخاب کن"
            : "یه موضوع انتخاب کن"}
        </p>
      </header>

      {/* مرحله ۱: انتخاب دسته */}
      {!selectedCategory && (
        <section className="space-y-3">
          {aiQuestions.categories.map((cat: any) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="w-full bg-white rounded-2xl border border-pink-100 p-4 text-right hover:bg-pink-50/50 transition-all active:scale-95"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-pink-900">{cat.title}</h3>
                  <p className="text-xs text-pink-500 mt-0.5">
                    {cat.questions.length} سوال
                  </p>
                </div>
                <span className="text-pink-400">←</span>
              </div>
            </button>
          ))}
        </section>
      )}

      {/* مرحله ۲: انتخاب سوال */}
      {selectedCategory && !selectedQuestion && (
        <section className="space-y-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-xs text-pink-600 flex items-center gap-1 mb-2"
          >
            → برگشت به موضوعات
          </button>

          {aiQuestions.categories
            .find((c: any) => c.id === selectedCategory)
            ?.questions.map((q: any) => (
              <button
                key={q.id}
                onClick={() => handleQuestionSelect(q)}
                className="w-full bg-white rounded-2xl border border-pink-100 p-4 text-right hover:bg-pink-50/50 transition-all active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">❓</span>
                  <p className="text-sm text-pink-900 flex-1">{q.question}</p>
                  <span className="text-pink-400">←</span>
                </div>
              </button>
            ))}
        </section>
      )}

      {/* مرحله ۳: نمایش جواب */}
      {selectedQuestion && (
        <section className="space-y-4">
          <button
            onClick={() => {
              setSelectedQuestion(null);
              setAnswer("");
            }}
            className="text-xs text-pink-600 flex items-center gap-1 mb-2"
          >
            → سوال دیگه
          </button>

          {/* سوال کاربر */}
          <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
            <p className="text-xs text-pink-500 mb-2">❓ سوال تو:</p>
            <p className="text-sm font-bold text-pink-900">
              {selectedQuestion.question}
            </p>
          </div>

          {/* جواب AI */}
          <div className="bg-white rounded-2xl p-4 border border-pink-100 shadow-sm">
            <p className="text-xs text-purple-500 mb-2">🤖 پاسخ:</p>
            {loading ? (
              <div className="text-center py-6">
                <div className="inline-block animate-spin text-3xl">⏳</div>
                <p className="text-xs text-gray-500 mt-3">
                  در حال آماده‌سازی پاسخ...
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-800 leading-loose whitespace-pre-line">
                {answer}
              </p>
            )}
          </div>
        </section>
      )}

      {/* فوتر */}
      <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 text-xs text-pink-600 leading-relaxed text-center">
        💜 دستیار مادریار همیشه کنارته
      </div>
    </div>
  );
}