"use client";

import { useState } from "react";
import data from "@/content/self-care/heart/contents.json";

export default function HeartPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openArticle, setOpenArticle] = useState<number | null>(null);

  const category = data.categories.find((c) => c.id === selectedCategory);

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-pink-800">🌸 قلب زنانه</h1>
        <p className="text-sm text-gray-500">برای خودت و زن بودنت</p>
      </header>

      {!selectedCategory && (
        <section className="space-y-3">
          <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">
            این روزها بیشتر درگیر کدومی؟
          </p>

          {data.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="w-full bg-white rounded-2xl border border-pink-100 p-4 text-right hover:shadow-md transition-all active:scale-95"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{cat.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-pink-900">{cat.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {cat.description}
                  </p>
                </div>
                <span className="text-pink-400">←</span>
              </div>
            </button>
          ))}
        </section>
      )}

      {category && (
        <section className="space-y-3">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setOpenArticle(null);
            }}
            className="text-sm text-pink-600 flex items-center gap-1 mb-2"
          >
            → برگشت به موضوعات
          </button>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">{category.icon}</span>
            <h2 className="font-bold text-pink-900">{category.title}</h2>
          </div>

          {category.articles.map((article) => {
            const isOpen = openArticle === article.id;

            return (
              <div
                key={article.id}
                className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenArticle(isOpen ? null : article.id)}
                  className="w-full flex items-center gap-3 p-4 text-right hover:bg-pink-50/50 transition-colors"
                >
                  <span className="text-2xl">{article.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-pink-900 text-sm">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {article.preview}
                    </p>
                  </div>
                  <span
                    className={`text-pink-400 transition-transform ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  >
                    ←
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-pink-100">
                    <p className="text-sm text-gray-700 leading-loose whitespace-pre-line">
                      {article.body}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}

      <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 text-xs text-pink-600 leading-relaxed text-center">
        💕 این بخش برای حمایت از توست.
      </div>
    </div>
  );
}