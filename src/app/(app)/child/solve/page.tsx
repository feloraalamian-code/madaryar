"use client";

import { useState } from "react";
import Link from "next/link";
import solveData from "@/content/child/solve-problems.json";

type Problem = {
  id: string;
  icon: string;
  title: string;
  questions: {
    id: string;
    text: string;
    options: string[];
  }[];
  solutions: {
    default: {
      steps: string[];
      content: { title: string; href: string } | null;
      challenge: { title: string; id: string } | null;
      useAI?: boolean;
    };
  };
};

type Step = "select-problem" | "questions" | "solution";

export default function SolvePage() {
  const [step, setStep] = useState<Step>("select-problem");
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const selectProblem = (problem: Problem) => {
    setSelectedProblem(problem);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setStep("questions");
  };

  const answerQuestion = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    if (
      selectedProblem &&
      currentQuestionIndex < selectedProblem.questions.length - 1
    ) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStep("solution");
    }
  };

  const reset = () => {
    setStep("select-problem");
    setSelectedProblem(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  return (
    <div className="space-y-5 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-pink-800">🧩 حل مسئله</h1>
        <p className="text-sm text-gray-500">
          {step === "select-problem" && "چی اتفاق افتاده؟"}
          {step === "questions" && "چند تا سؤال کوتاه"}
          {step === "solution" && "راهنمای مادریار"}
        </p>
      </header>

      {/* مرحله ۱: انتخاب مشکل */}
      {step === "select-problem" && (
        <section className="space-y-3">
          <Link
            href="/child"
            className="text-xs text-pink-600 flex items-center gap-1"
          >
            → برگشت
          </Link>

          <div className="grid grid-cols-2 gap-3">
            {(solveData.problems as Problem[]).map((problem) => (
              <button
                key={problem.id}
                onClick={() => selectProblem(problem)}
                className="bg-white rounded-2xl border border-pink-100 p-4 text-center hover:shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <div className="text-4xl mb-2">{problem.icon}</div>
                <div className="text-sm font-bold text-pink-900">
                  {problem.title}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* مرحله ۲: سؤالات */}
      {step === "questions" && selectedProblem && (
        <section className="space-y-4">
          <button
            onClick={reset}
            className="text-xs text-pink-600 flex items-center gap-1"
          >
            → برگشت
          </button>

          {/* پیشرفت */}
          <div className="flex items-center justify-center gap-2">
            {selectedProblem.questions.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === currentQuestionIndex
                    ? "w-8 bg-pink-500"
                    : idx < currentQuestionIndex
                    ? "w-2 bg-pink-300"
                    : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{selectedProblem.icon}</div>
              <h2 className="text-lg font-bold text-gray-800">
                {selectedProblem.questions[currentQuestionIndex].text}
              </h2>
            </div>

            <div className="space-y-2">
              {selectedProblem.questions[currentQuestionIndex].options.map(
                (option) => (
                  <button
                    key={option}
                    onClick={() =>
                      answerQuestion(
                        selectedProblem.questions[currentQuestionIndex].id,
                        option
                      )
                    }
                    className="w-full bg-gradient-to-l from-pink-50 to-rose-50 border border-pink-100 rounded-2xl p-4 text-right hover:from-pink-100 hover:to-rose-100 hover:scale-105 active:scale-95 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-pink-400">▸</span>
                      <span className="text-sm text-pink-900">{option}</span>
                    </div>
                  </button>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* مرحله ۳: راه‌حل */}
      {step === "solution" && selectedProblem && (
        <section className="space-y-4">
          <button
            onClick={reset}
            className="text-xs text-pink-600 flex items-center gap-1"
          >
            → مشکل جدید
          </button>

          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-6 border border-pink-100 shadow-lg">
            {/* هدر */}
            <div className="text-center space-y-2 mb-5">
              <div className="text-5xl">{selectedProblem.icon}</div>
              <h2 className="text-xl font-bold text-pink-900">
                {selectedProblem.title}
              </h2>
            </div>

            <div className="w-full h-px bg-pink-200 my-4" />

            {/* راه‌حل */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-pink-800 mb-3">
                  🎯 این کارها رو امتحان کن:
                </h3>
                <ol className="space-y-3">
                  {selectedProblem.solutions.default.steps.map((step, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 bg-white/60 rounded-xl p-3"
                    >
                      <span className="bg-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-pink-900 leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* لینک محتوا */}
              {selectedProblem.solutions.default.content && (
                <Link
                  href={selectedProblem.solutions.default.content.href}
                  className="block bg-white/70 rounded-2xl p-4 border border-pink-200 hover:bg-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📚</span>
                    <div className="flex-1">
                      <p className="text-[10px] text-pink-600 font-bold">
                        بیشتر بخون
                      </p>
                      <p className="text-sm font-bold text-pink-900">
                        {selectedProblem.solutions.default.content.title}
                      </p>
                    </div>
                    <span className="text-pink-400">←</span>
                  </div>
                </Link>
              )}

              {/* چالش */}
              {selectedProblem.solutions.default.challenge && (
                <Link
                  href="/me/challenges"
                  className="block bg-gradient-to-l from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <div className="flex-1">
                      <p className="text-[10px] text-amber-600 font-bold">
                        چالش مرتبط
                      </p>
                      <p className="text-sm font-bold text-amber-900">
                        {selectedProblem.solutions.default.challenge.title}
                      </p>
                    </div>
                    <span className="text-amber-400">←</span>
                  </div>
                </Link>
              )}

              {/* AI */}
              {selectedProblem.solutions.default.useAI && (
                <Link
                  href="/chat"
                  className="block bg-gradient-to-l from-purple-50 to-violet-50 rounded-2xl p-4 border border-purple-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🤖</span>
                    <div className="flex-1">
                      <p className="text-[10px] text-purple-600 font-bold">
                        از AI بپرس
                      </p>
                      <p className="text-sm font-bold text-purple-900">
                        مشکلت رو با جزئیات بپرس
                      </p>
                    </div>
                    <span className="text-purple-400">←</span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 text-xs text-pink-600 text-center">
        💜 تو داری بهترین کارت رو می‌کنی
      </div>
    </div>
  );
}