"use client";

import { useState } from "react";
import funData from "@/content/self-care/fun.json";
import { IconBook, IconPodcast, IconMovie } from "@/components/FunIcons";

export default function FunPage() {
  const initialIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));

  const [bookIndex, setBookIndex] = useState(
    initialIndex % funData.books.length
  );
  const [podcastIndex, setPodcastIndex] = useState(
    initialIndex % funData.podcasts.length
  );
  const [movieIndex, setMovieIndex] = useState(
    initialIndex % funData.movies.length
  );

  const book = funData.books[bookIndex];
  const podcast = funData.podcasts[podcastIndex];
  const movie = funData.movies[movieIndex];

  const handleNewSuggestions = () => {
    let newBook = bookIndex;
    let newPodcast = podcastIndex;
    let newMovie = movieIndex;

    while (newBook === bookIndex) {
      newBook = Math.floor(Math.random() * funData.books.length);
    }
    while (newPodcast === podcastIndex) {
      newPodcast = Math.floor(Math.random() * funData.podcasts.length);
    }
    while (newMovie === movieIndex) {
      newMovie = Math.floor(Math.random() * funData.movies.length);
    }

    setBookIndex(newBook);
    setPodcastIndex(newPodcast);
    setMovieIndex(newMovie);
  };

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-pink-800">🎉 تفریح</h1>
        <p className="text-sm text-gray-500">سه پیشنهاد برای امروزت</p>
      </header>

      {/* کتاب */}
      <section className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-5 border border-pink-100 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/70 flex items-center justify-center shadow-sm flex-shrink-0">
            <IconBook className="w-12 h-12" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="inline-block bg-white/70 rounded-full px-3 py-1">
              <span className="text-xs font-medium text-pink-600">
                📚 کتاب امروز
              </span>
            </div>
            <h2 className="text-lg font-bold text-pink-900">{book.title}</h2>
            <p className="text-xs text-pink-700">اثر {book.author}</p>
          </div>
        </div>
        <div className="w-full h-px bg-pink-200 my-3" />
        <p className="text-sm text-pink-800 leading-loose">
          {book.description}
        </p>
      </section>

      {/* پادکست */}
      <section className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-3xl p-5 border border-purple-100 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/70 flex items-center justify-center shadow-sm flex-shrink-0">
            <IconPodcast className="w-12 h-12" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="inline-block bg-white/70 rounded-full px-3 py-1">
              <span className="text-xs font-medium text-purple-600">
                🎙️ پادکست امروز
              </span>
            </div>
            <h2 className="text-lg font-bold text-purple-900">
              {podcast.title}
            </h2>
            <p className="text-xs text-purple-700">{podcast.author}</p>
          </div>
        </div>
        <div className="w-full h-px bg-purple-200 my-3" />
        <p className="text-sm text-purple-800 leading-loose">
          {podcast.description}
        </p>
      </section>

      {/* فیلم */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-5 border border-blue-100 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/70 flex items-center justify-center shadow-sm flex-shrink-0">
            <IconMovie className="w-12 h-12" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="inline-block bg-white/70 rounded-full px-3 py-1">
              <span className="text-xs font-medium text-blue-600">
                🎬 فیلم امروز
              </span>
            </div>
            <h2 className="text-lg font-bold text-blue-900">{movie.title}</h2>
            <p className="text-xs text-blue-700">{movie.author}</p>
          </div>
        </div>
        <div className="w-full h-px bg-blue-200 my-3" />
        <p className="text-sm text-blue-800 leading-loose">
          {movie.description}
        </p>
      </section>

      {/* دکمه پیشنهاد دیگه */}
      <button
        onClick={handleNewSuggestions}
        className="w-full bg-pink-500 hover:bg-pink-600 active:scale-95 text-white font-bold py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
      >
        <span className="text-xl">🎲</span>
        <span>یه پیشنهاد دیگه بده</span>
      </button>

      <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 text-xs text-pink-600 leading-relaxed text-center">
        💕 هر روز، سه پیشنهاد جدید
      </div>
    </div>
  );
}