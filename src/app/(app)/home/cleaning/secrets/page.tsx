"use client";

import Link from "next/link";
import data from "@/content/home/cleaning/secrets.json";

export default function SecretsPage() {
  return (
    <div className="space-y-6 pb-8">
      <header className="pt-4 text-center space-y-2">
        <h1 className="text-2xl font-bold text-cyan-800">✨ راز کدبانو</h1>
        <p className="text-sm text-gray-500">نکته‌های ریز خانه‌داری</p>
      </header>

      <Link
        href="/home/cleaning"
        className="text-xs text-cyan-600 flex items-center gap-1"
      >
        → برگشت به مأموریت
      </Link>

      <section className="space-y-2">
        {data.secrets.map((secret: any) => (
          <div
            key={secret.id}
            className="bg-white rounded-2xl border border-cyan-100 shadow-sm p-4 flex items-start gap-3"
          >
            <span className="text-2xl flex-shrink-0">{secret.icon}</span>
            <p className="text-xs text-cyan-800 leading-relaxed">
              {secret.text}
            </p>
          </div>
        ))}
      </section>

      <div className="bg-cyan-50 rounded-2xl p-4 border border-cyan-100 text-xs text-cyan-600 text-center">
        💙 رازهای کوچیک، زندگی آسون‌تر
      </div>
    </div>
  );
}