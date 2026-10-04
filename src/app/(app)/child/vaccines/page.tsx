"use client";

import { useState, useEffect } from "react";
import data from "@/content/child/vaccines.json";
import { useLocalStorage } from "@/hooks/useLocalStorage";

type VaccineStatus = {
  id: number;
  done: boolean;
  doneDate: string;
};

export default function VaccinesPage() {
  const [statuses, setStatuses] = useLocalStorage<VaccineStatus[]>(
    "vaccine-statuses",
    []
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempDate, setTempDate] = useState("");
  const [modalId, setModalId] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getStatus = (id: number): VaccineStatus => {
    return (
      statuses.find((s) => s.id === id) || {
        id,
        done: false,
        doneDate: "",
      }
    );
  };

  const toggleDone = (id: number) => {
    const current = getStatus(id);
    const updated = statuses.filter((s) => s.id !== id);
    updated.push({
      ...current,
      done: !current.done,
      doneDate: !current.done ? new Date().toLocaleDateString("fa-IR") : "",
    });
    setStatuses(updated);
  };

  const saveDate = (id: number) => {
    const current = getStatus(id);
    const updated = statuses.filter((s) => s.id !== id);
    updated.push({
      ...current,
      doneDate: tempDate,
      done: tempDate !== "",
    });
    setStatuses(updated);
    setEditingId(null);
    setTempDate("");
  };

  const selectedVaccine = data.vaccines.find((v) => v.id === modalId);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-cyan-500">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-cyan-800">
          💉 {data.title}
        </h1>
        <p className="text-sm text-gray-500">{data.subtitle}</p>
      </header>

      <section className="space-y-3">
        {data.vaccines.map((vaccine) => {
          const status = getStatus(vaccine.id);
          const isEditing = editingId === vaccine.id;

          return (
            <div
              key={vaccine.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${
                status.done ? "border-green-200" : "border-cyan-100"
              }`}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {/* تیک */}
                  <button
                    onClick={() => toggleDone(vaccine.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      status.done
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 text-gray-400 border-2 border-gray-200"
                    }`}
                  >
                    {status.done ? "✓" : ""}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg">{vaccine.icon}</span>
                      <h3 className="font-bold text-gray-800">
                        {vaccine.title}
                      </h3>
                      {status.done && (
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                          انجام شده
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      {vaccine.description}
                    </p>

                    {/* تاریخ */}
                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-gray-500">
                        📅 انجام شده در:
                      </span>
                      {isEditing ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="text"
                            value={tempDate}
                            onChange={(e) => setTempDate(e.target.value)}
                            placeholder="مثلاً ۱۳ مهر ۱۴۰۱"
                            className="flex-1 text-xs border border-cyan-200 rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-400"
                            autoFocus
                          />
                          <button
                            onClick={() => saveDate(vaccine.id)}
                            className="text-xs bg-cyan-500 text-white px-2 py-1 rounded-lg"
                          >
                            ذخیره
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setTempDate("");
                            }}
                            className="text-xs text-gray-400"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="text-xs text-gray-700 font-medium">
                            {status.doneDate || "ثبت نشده"}
                          </span>
                          <button
                            onClick={() => {
                              setEditingId(vaccine.id);
                              setTempDate(status.doneDate);
                            }}
                            className="text-cyan-500 text-xs"
                          >
                            ✏️
                          </button>
                        </>
                      )}
                    </div>

                    {/* دکمه توضیحات بیشتر */}
                    <button
                      onClick={() => setModalId(vaccine.id)}
                      className="mt-3 text-xs text-cyan-600 font-medium flex items-center gap-1 hover:text-cyan-800"
                    >
                      توضیحات بیشتر ←
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <div className="bg-cyan-50 rounded-2xl p-4 border border-cyan-100 text-xs text-cyan-700 leading-relaxed text-center">
        💉 واکسن‌ها رو سر وقت بزنید
      </div>

      {/* Modal توضیحات */}
      {selectedVaccine && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setModalId(null)}
        >
          <div
            className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* هدر Modal */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedVaccine.icon}</span>
                <h2 className="font-bold text-gray-800">
                  {selectedVaccine.title}
                </h2>
              </div>
              <button
                onClick={() => setModalId(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
              >
                ✕
              </button>
            </div>

            {/* محتوا */}
            <div className="p-4 space-y-4">
              {/* مقدمه */}
              <div className="bg-cyan-50 rounded-2xl p-3">
                <p className="text-xs text-cyan-900 leading-loose">
                  {selectedVaccine.details.intro}
                </p>
              </div>

              {/* واکسن‌ها */}
              <div>
                <h3 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-2">
                  <span>💉</span>
                  <span>واکسن‌های این دوره:</span>
                </h3>
                <div className="space-y-2">
                  {selectedVaccine.details.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-xl p-3 border border-gray-100"
                    >
                      <p className="text-xs font-bold text-gray-800 mb-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {item.info}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* عوارض */}
              <div>
                <h3 className="font-bold text-sm text-amber-800 mb-2 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>عوارض احتمالی:</span>
                </h3>
                <ul className="space-y-1">
                  {selectedVaccine.details.sideEffects.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-gray-700 flex items-start gap-2"
                    >
                      <span className="text-amber-400">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* مراقبت */}
              <div>
                <h3 className="font-bold text-sm text-green-800 mb-2 flex items-center gap-2">
                  <span>💡</span>
                  <span>مراقبت‌های بعد از واکسن:</span>
                </h3>
                <ul className="space-y-1">
                  {selectedVaccine.details.care.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-gray-700 flex items-start gap-2"
                    >
                      <span className="text-green-400">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* هشدار */}
              <div className="bg-red-50 rounded-2xl p-3 border-r-4 border-red-400">
                <p className="text-xs font-bold text-red-800 mb-1 flex items-center gap-2">
                  <span>🚨</span>
                  <span>کی به پزشک مراجعه کنیم؟</span>
                </p>
                <p className="text-xs text-red-700 leading-loose">
                  {selectedVaccine.details.warning}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}