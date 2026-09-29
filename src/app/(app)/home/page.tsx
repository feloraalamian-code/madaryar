export default function HomePage() {
  return (
    <div className="space-y-6">
      <header className="pt-4">
        <h1 className="text-2xl font-bold text-gray-800">خانه</h1>
        <p className="text-sm text-gray-500 mt-1">
          کارهای روزمره و موجودی خانه
        </p>
      </header>

      <section className="space-y-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-2">
            📝 کارهای امروز
          </h2>
          <p className="text-sm text-gray-500">
            به زودی اینجا کارهای شما نمایش داده می‌شود.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-700 mb-2">
            📦 انبار خانه
          </h2>
          <p className="text-sm text-gray-500">
            به زودی اینجا اقلام ضروری خانه نمایش داده می‌شود.
          </p>
        </div>

        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
          <h2 className="font-semibold text-purple-700 mb-2">
            💜 یادآور امروز
          </h2>
          <p className="text-sm text-purple-600">
            یادت باشه تو هم مهمی؛ یک چای برای خودت بریز.
          </p>
        </div>
      </section>
    </div>
  );
}