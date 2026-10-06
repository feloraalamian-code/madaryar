"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import itemsData from "@/content/home/inventory/items.json";

type ItemStatus = "have" | "low" | "out";

type InventoryState = {
  [key: string]: ItemStatus;
};

const STATUS_OPTIONS: { value: ItemStatus; label: string; emoji: string; color: string }[] = [
  { value: "have", label: "دارم", emoji: "🟢", color: "bg-green-50 border-green-200 text-green-700" },
  { value: "low", label: "کم", emoji: "🟡", color: "bg-amber-50 border-amber-200 text-amber-700" },
  { value: "out", label: "تموم", emoji: "🔴", color: "bg-red-50 border-red-200 text-red-700" },
];

export default function InventoryPage() {
  const [inventory, setInventory] = useLocalStorage<InventoryState>(
    "home-inventory",
    {}
  );
  const [openCategories, setOpenCategories] = useState<string[]>(["pantry"]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleCategory = (id: string) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const setItemStatus = (itemKey: string, status: ItemStatus) => {
    setInventory((prev) => {
      // اگه همون وضعیت قبلی بود، حذف کن (toggle)
      if (prev[itemKey] === status) {
        const updated = { ...prev };
        delete updated[itemKey];
        return updated;
      }
      return { ...prev, [itemKey]: status };
    });
  };

  const getItemStatus = (itemKey: string): ItemStatus | null => {
    return inventory[itemKey] || null;
  };

  const getCategoryStats = (categoryId: string, items: string[]) => {
    let have = 0;
    let low = 0;
    let out = 0;

    items.forEach((item) => {
      const key = `${categoryId}-${item}`;
      const status = inventory[key];
      if (status === "have") have++;
      else if (status === "low") low++;
      else if (status === "out") out++;
    });

    return { have, low, out, total: items.length };
  };

  if (!isLoaded) return null;

  return (
    <div className="space-y-5 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-violet-800">📦 موجودی منزل</h1>
        <p className="text-sm text-gray-500">چی دارم، چی کم دارم</p>
      </header>

      {/* خلاصه */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-4 border border-violet-100">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {Object.values(inventory).filter((s) => s === "have").length}
            </div>
            <div className="text-[10px] text-gray-500 mt-1">🟢 دارم</div>
          </div>
          <div className="border-x border-violet-200">
            <div className="text-2xl font-bold text-amber-600">
              {Object.values(inventory).filter((s) => s === "low").length}
            </div>
            <div className="text-[10px] text-gray-500 mt-1">🟡 کم</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-600">
              {Object.values(inventory).filter((s) => s === "out").length}
            </div>
            <div className="text-[10px] text-gray-500 mt-1">🔴 تموم</div>
          </div>
        </div>
      </div>

      {/* دسته‌بندی‌ها */}
      <section className="space-y-3">
        {itemsData.categories.map((cat: any) => {
          const isOpen = openCategories.includes(cat.id);
          const stats = getCategoryStats(cat.id, cat.items);

          return (
            <div
              key={cat.id}
              className="bg-white rounded-2xl border border-violet-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center gap-3 p-4 text-right hover:bg-violet-50/50 transition-colors"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-violet-900 text-sm">
                    {cat.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {stats.have > 0 && (
                      <span className="text-[10px] text-green-600">
                        🟢 {stats.have}
                      </span>
                    )}
                    {stats.low > 0 && (
                      <span className="text-[10px] text-amber-600">
                        🟡 {stats.low}
                      </span>
                    )}
                    {stats.out > 0 && (
                      <span className="text-[10px] text-red-600">
                        🔴 {stats.out}
                      </span>
                    )}
                    <span className="text-[10px] text-gray-400">
                      از {stats.total}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-violet-400 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  ←
                </span>
              </button>

              {isOpen && (
                <div className="px-3 pb-3 space-y-2 border-t border-violet-100 pt-3">
                  {cat.items.map((item: string) => {
                    const key = `${cat.id}-${item}`;
                    const status = getItemStatus(key);

                    return (
                      <div
                        key={key}
                        className="bg-gray-50 rounded-xl p-3"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-800">{item}</span>
                          {status && (
                            <span className="text-xs">
                              {STATUS_OPTIONS.find((s) => s.value === status)?.emoji}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                          {STATUS_OPTIONS.map((opt) => {
                            const isActive = status === opt.value;
                            return (
                              <button
                                key={opt.value}
                                onClick={() => setItemStatus(key, opt.value)}
                                className={`text-[10px] py-1.5 rounded-lg border transition-all ${
                                  isActive
                                    ? opt.color + " font-bold"
                                    : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                                }`}
                              >
                                {opt.emoji} {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div className="bg-violet-50 rounded-2xl p-4 border border-violet-100 text-xs text-violet-600 text-center">
        💜 موجودی‌ت رو به‌روز نگه دار
      </div>
    </div>
  );
}