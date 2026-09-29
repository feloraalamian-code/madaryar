export default function ChildPage() {
  return (
    <div className="space-y-6">
      <header className="pt-4">
        <h1 className="text-2xl font-bold text-gray-800">کودک</h1>
        <p className="text-sm text-gray-500 mt-1">
          پیگیری رشد، واکسن و سلامت کودک
        </p>
      </header>

      <section className="space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-2">
            📏 رشد و وزن
          </h2>
          <p className="text-sm text-gray-500">
            به زودی اینجا روند رشد کودک نمایش داده می‌شود.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-2">
            💉 واکسن‌ها
          </h2>
          <p className="text-sm text-gray-500">
            به زودی اینجا وضعیت واکسن‌های کودک نمایش داده می‌شود.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-2">
            🌡️ نگرانی‌های رایج
          </h2>
          <p className="text-sm text-gray-500">
            تب، استفراغ، دل‌درد، کولیک، آلرژی
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-2">
            🥗 تغذیه
          </h2>
          <p className="text-sm text-gray-500">
            غذاهای مناسب و دستورهای ساده
          </p>
        </div>
      </section>

      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-xs text-amber-700 leading-relaxed">
        ⚠️ اطلاعات این بخش عمومی و آموزشی است و جایگزین توصیه پزشک نیست.
        در موارد جدی با پزشک مشورت کنید.
      </div>
    </div>
  );
}