"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import giftsData from "@/content/self-care/gifts.json";

type Gift = {
  id: number;
  emoji: string;
  text: string;
  category: string;
};

export default function GiftPage() {
  const [isOpened, setIsOpened] = useState(false);
  const [todayGift, setTodayGift] = useState<Gift | null>(null);
  const [savedGifts, setSavedGifts] = useLocalStorage<number[]>(
    "saved-gifts",
    []
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    const gift = giftsData.gifts[dayIndex % giftsData.gifts.length] as Gift;
    setTodayGift(gift);
    setIsLoaded(true);
  }, []);

  const openGift = () => {
    setIsOpened(true);
  };

  const saveGift = () => {
    if (!todayGift) return;
    if (savedGifts.includes(todayGift.id)) {
      setSavedGifts(savedGifts.filter((id) => id !== todayGift.id));
    } else {
      setSavedGifts([...savedGifts, todayGift.id]);
    }
  };

  const shareGift = async () => {
    if (!todayGift) return;
    const shareText = `${todayGift.emoji} ${todayGift.text}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "هدیه مادریار",
          text: shareText,
        });
      } catch (error) {
        console.log("اشتراک لغو شد");
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      alert("متن کپی شد! ❤️");
    }
  };

  const newGift = () => {
    const currentId = todayGift?.id;
    let randomIndex = Math.floor(Math.random() * giftsData.gifts.length);
    while (giftsData.gifts[randomIndex].id === currentId) {
      randomIndex = Math.floor(Math.random() * giftsData.gifts.length);
    }
    setTodayGift(giftsData.gifts[randomIndex] as Gift);
  };

  if (!isLoaded || !todayGift) return null;

  const isSaved = savedGifts.includes(todayGift.id);
  const savedGiftsList = giftsData.gifts.filter((g) =>
    savedGifts.includes(g.id)
  ) as Gift[];

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-pink-800">🎁 جعبه هدیه</h1>
        <p className="text-sm text-gray-500">یه هدیه کوچیک برای خودت</p>
      </header>

      {!isOpened ? (
        <div className="bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 rounded-3xl p-8 border border-pink-200 shadow-lg">
          <div className="text-center space-y-6">
            <div className="text-8xl animate-bounce">🎁</div>
            <h2 className="text-xl font-bold text-pink-800">
              جعبه هدیه امروز
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              بذار ببینم امروز چی برات دارم...
            </p>
            <button
              onClick={openGift}
              className="w-full bg-gradient-to-l from-pink-500 to-purple-500 text-white font-bold py-4 rounded-2xl shadow-md active:scale-95 transition-all"
            >
              🎁 باز کن
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 rounded-3xl p-8 border border-pink-200 shadow-lg">
            <div className="text-center space-y-6">
              <div className="text-6xl">{todayGift.emoji}</div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6">
                <p className="text-lg text-pink-900 leading-loose font-medium">
                  «{todayGift.text}»
                </p>
              </div>

              <p className="text-xs text-pink-600">
                💜 این هدیه امروز برای توئه
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={saveGift}
              className={`py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 ${
                isSaved
                  ? "bg-pink-500 text-white"
                  : "bg-white text-pink-600 border border-pink-200"
              }`}
            >
              {isSaved ? "❤️ ذخیره شد" : "🤍 ذخیره"}
            </button>

            <button
              onClick={shareGift}
              className="bg-white text-pink-600 border border-pink-200 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all"
            >
              📤 اشتراک
            </button>

            <button
              onClick={newGift}
              className="bg-white text-pink-600 border border-pink-200 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all"
            >
              🎲 دیگه
            </button>
          </div>

          {savedGiftsList.length > 0 && (
            <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
              <button
                onClick={() => setShowSaved(!showSaved)}
                className="w-full flex items-center justify-between"
              >
                <p className="text-xs font-bold text-pink-700">
                  ❤️ هدیه‌های ذخیره شده: {savedGiftsList.length}
                </p>
                <span
                  className={`text-pink-500 transition-transform ${
                    showSaved ? "rotate-90" : ""
                  }`}
                >
                  ←
                </span>
              </button>

              {showSaved && (
                <div className="space-y-2 mt-3">
                  {savedGiftsList.map((gift) => (
                    <div
                      key={gift.id}
                      className="bg-white rounded-xl p-3 text-xs text-gray-700 leading-relaxed"
                    >
                      <span className="mr-2">{gift.emoji}</span>
                      {gift.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 text-xs text-pink-600 text-center leading-relaxed">
        💜 هر روز یه هدیه کوچیک برای تو
      </div>
    </div>
  );
}