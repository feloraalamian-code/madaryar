"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import categoriesData from "@/content/home/finance/categories.json";

type TransactionType = "income" | "expense";

type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  category?: string;
  note?: string;
  date: string;
};

export default function FinancePage() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    "home-finance",
    []
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<string>("supermarket");
  const [note, setNote] = useState("");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getTodayJalali = () => {
    const today = new Date();
    return today.toLocaleDateString("fa-IR");
  };

  const addTransaction = () => {
    const numAmount = parseInt(amount.replace(/[^\d]/g, ""));

    if (!numAmount || numAmount <= 0) {
      alert("لطفاً مبلغ معتبر وارد کن");
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount: numAmount,
      category: type === "expense" ? category : undefined,
      note: note.trim() || undefined,
      date: getTodayJalali(),
    };

    setTransactions([newTransaction, ...transactions]);
    setAmount("");
    setNote("");
    setShowForm(false);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("fa-IR");
  };

  const currentMonth = new Date()
    .toLocaleDateString("fa-IR")
    .split("/")
    .slice(0, 2)
    .join("/");

  const monthTransactions = transactions.filter((t) => {
    const tMonth = t.date.split("/").slice(0, 2).join("/");
    return tMonth === currentMonth;
  });

  const totalIncome = monthTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = monthTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // محاسبه هزینه‌ها بر اساس دسته
  const expensesByCategory = categoriesData.expenseCategories
    .map((cat) => {
      const total = monthTransactions
        .filter((t) => t.type === "expense" && t.category === cat.id)
        .reduce((sum, t) => sum + t.amount, 0);
      return { ...cat, total };
    })
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total);

  const maxCategoryTotal = Math.max(
    ...expensesByCategory.map((c) => c.total),
    1
  );

  const getCategoryInfo = (id?: string) => {
    if (!id) return null;
    return categoriesData.expenseCategories.find((c) => c.id === id);
  };

  if (!isLoaded) return null;

  return (
    <div className="space-y-5 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-green-800">💰 دخل و خرج</h1>
        <p className="text-sm text-gray-500">مدیریت خرج خونه</p>
      </header>

      {/* خلاصه ماه */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-5 border border-green-100 shadow-sm">
        <div className="text-center mb-4">
          <p className="text-xs text-gray-500">📊 این ماه</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/70 rounded-2xl p-3 text-center">
            <div className="text-[10px] text-green-600 mb-1">💰 درآمد</div>
            <div className="text-lg font-bold text-green-700">
              {formatNumber(totalIncome)}
            </div>
          </div>
          <div className="bg-white/70 rounded-2xl p-3 text-center">
            <div className="text-[10px] text-red-600 mb-1">💸 هزینه</div>
            <div className="text-lg font-bold text-red-700">
              {formatNumber(totalExpense)}
            </div>
          </div>
        </div>

        <div
          className={`rounded-2xl p-4 text-center ${
            balance >= 0 ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <div className="text-[10px] text-gray-600 mb-1">
            {balance >= 0 ? "📈 باقی‌مونده" : "📉 کسری"}
          </div>
          <div
            className={`text-2xl font-bold ${
              balance >= 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            {formatNumber(Math.abs(balance))}
          </div>
        </div>
      </div>

      {/* نمودار میله‌ای */}
      {expensesByCategory.length > 0 && (
        <div className="bg-white rounded-3xl p-5 border border-green-100 shadow-sm">
          <h2 className="font-bold text-gray-800 text-sm mb-4">
            📊 بیشترین هزینه‌ها
          </h2>

          <div className="space-y-3">
            {expensesByCategory.map((cat) => {
              const percentage = Math.round(
                (cat.total / totalExpense) * 100
              );
              const barWidth = (cat.total / maxCategoryTotal) * 100;

              return (
                <div key={cat.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-xs font-bold text-gray-700">
                        {cat.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">
                        {formatNumber(cat.total)}
                      </span>
                      <span className="text-xs font-bold text-green-700">
                        {percentage}٪
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full bg-gradient-to-l from-green-400 to-emerald-500 transition-all"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* دکمه ثبت */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full bg-gradient-to-l from-green-500 to-emerald-500 text-white font-bold py-4 rounded-2xl shadow-md active:scale-95 transition-all text-lg"
        >
          ➕ تراکنش جدید
        </button>
      )}

      {/* فرم */}
      {showForm && (
        <div className="bg-white rounded-3xl p-5 border border-green-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-800">📝 تراکنش جدید</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 text-xl"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setType("income")}
              className={`py-3 rounded-xl font-bold text-sm transition-all ${
                type === "income"
                  ? "bg-green-500 text-white"
                  : "bg-gray-50 text-gray-600 border border-gray-200"
              }`}
            >
              💰 درآمد
            </button>
            <button
              onClick={() => setType("expense")}
              className={`py-3 rounded-xl font-bold text-sm transition-all ${
                type === "expense"
                  ? "bg-red-500 text-white"
                  : "bg-gray-50 text-gray-600 border border-gray-200"
              }`}
            >
              💸 هزینه
            </button>
          </div>

          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              مبلغ (تومان)
            </label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="مثلاً ۵۰۰۰۰۰"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400"
              dir="ltr"
            />
          </div>

          {type === "expense" && (
            <div>
              <label className="text-xs text-gray-600 mb-2 block">دسته</label>
              <div className="grid grid-cols-2 gap-2">
                {categoriesData.expenseCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs transition-all ${
                      category === cat.id
                        ? "bg-green-50 border-green-300 text-green-800"
                        : "bg-gray-50 border-gray-200 text-gray-600"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-gray-600 mb-1 block">
              توضیح (اختیاری)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="مثلاً خرید هفتگی"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-400"
            />
          </div>

          <button
            onClick={addTransaction}
            className="w-full bg-gradient-to-l from-green-500 to-emerald-500 text-white font-bold py-3 rounded-2xl active:scale-95 transition-all"
          >
            ✅ ثبت
          </button>
        </div>
      )}

      {/* لیست تراکنش‌ها */}
      {transactions.length > 0 && (
        <div className="bg-white rounded-3xl p-4 border border-green-100 shadow-sm">
          <h2 className="font-bold text-gray-800 text-sm mb-3">
            📋 تراکنش‌ها
          </h2>
          <div className="space-y-2">
            {transactions.slice(0, 20).map((t) => {
              const catInfo = getCategoryInfo(t.category);
              return (
                <div
                  key={t.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-xl">
                    {t.type === "income" ? "💰" : catInfo?.icon || "💸"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-800 truncate">
                        {t.type === "income"
                          ? t.note || "درآمد"
                          : catInfo?.label || "هزینه"}
                      </span>
                      <span
                        className={`text-sm font-bold flex-shrink-0 ${
                          t.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {t.type === "income" ? "+" : "−"}
                        {formatNumber(t.amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      {t.note && t.type === "expense" && (
                        <span className="text-[10px] text-gray-500 truncate">
                          {t.note}
                        </span>
                      )}
                      <span className="text-[10px] text-gray-400 mr-auto">
                        {t.date}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="text-gray-300 hover:text-red-500 text-sm flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {transactions.length > 20 && (
            <p className="text-[10px] text-gray-400 text-center mt-3">
              فقط ۲۰ تراکنش آخر نمایش داده می‌شود
            </p>
          )}
        </div>
      )}

      {transactions.length === 0 && !showForm && (
        <div className="bg-white rounded-3xl p-8 border border-green-100 shadow-sm text-center">
          <div className="text-5xl mb-3">💰</div>
          <p className="text-sm text-gray-500">
            هنوز تراکنشی ثبت نکردی
          </p>
        </div>
      )}

      <div className="bg-green-50 rounded-2xl p-4 border border-green-100 text-xs text-green-600 text-center">
        💚 مدیریت پول، آرامش ذهن
      </div>
    </div>
  );
}