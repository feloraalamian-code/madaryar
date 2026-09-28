Architecture — مادریار

سند معماری فنی نسخه MVP، با تصمیم قطعی Web App و قابلیت تبدیل به Android در آینده.

۱. هدف سند

این سند معماری فنی مادریار را برای نسخه MVP مشخص می‌کند.

هدف، انتخاب معماری‌ای است که:

برای MVP Web سریع و ساده باشد

Mobile-first و RTL باشد

امکان تبدیل به اپ اندروید در مرحله انتشار را حفظ کند

یک کدبیس برای وب و اندروید داشته باشد

از پیچیدگی غیرضروری پرهیز کند

۲. تصمیمات کلیدی معماری

#تصمیممقدار۱پلتفرم فعلیWeb App (Mobile-first)۲پلتفرم آیندهAndroid (از طریق Wrapper)۳فریم‌ورکNext.js + TypeScript (نسخه پایدار هنگام شروع Construction)۴بک‌اندداخل Next.js۵دیتابیسPostgreSQL۶ORMPrisma۷احراز هویتSession-based Authentication (انتخاب کتابخانه هنگام Construction)۸میزبانیVPS ایران۹زبان و چیدمانفارسی / RTL۱۰طراحیMobile-first 

۳. نمای کلی معماری

┌─────────────────────────────────────────────┐ │ MadarYar Web App │ │ (Next.js + TypeScript) │ ├─────────────────────────────────────────────┤ │ │ │ ┌──────────────┐ ┌──────────────┐ │ │ │ Frontend │◄────►│ Backend │ │ │ │ │ │ (داخل پروژه) │ │ │ └──────────────┘ └──────────────┘ │ │ │ │ │ │ │ ▼ │ │ │ ┌──────────────┐ │ │ │ │ Prisma │ │ │ │ └──────────────┘ │ │ │ │ │ │ │ ▼ │ │ │ ┌──────────────┐ │ │ │ │ PostgreSQL │ │ │ │ └──────────────┘ │ │ │ └─────────────────────────────────────────────┘ │ ▼ ┌────────────────┐ │ VPS ایران │ └────────────────┘ 

۴. Stack فنی

۴.۱ Frontend

موردانتخابفریم‌ورکNext.js + TypeScript (نسخه پایدار هنگام Construction)زبانTypeScriptاستایلTailwind CSSکامپوننتshadcn/ui (قابل تنظیم برای RTL)فونت فارسیVazirmatnجهتRTL (dir="rtl")فرمReact Hook Form + ZodStateContext یا Zustandنمودار رشدRecharts یا Chart.jsآیکونLucide 

انتخاب دقیق کتابخانه‌هایی که هنوز قطعی نشده‌اند، هنگام Construction نهایی می‌شود.

۴.۲ Backend

موردانتخابمحلداخل همان پروژه Next.jsزبانTypeScriptاعتبارسنجیZodاحراز هویتSession-based Authenticationمدیریت Sessionانتخاب کتابخانه هنگام Constructionهش رمزbcrypt 

۴.۳ دیتابیس

موردانتخابدیتابیسPostgreSQLORMPrismaمحیط توسعهPostgreSQL محلیمحیط تولیدPostgreSQL روی VPS ایران 

۴.۴ استقرار (Deployment)

موردانتخابمیزبانیVPS ایرانمسیر DeploymentDocker / Nginx / CI-CDSSLLet's EncryptBackupDump دوره‌ای PostgreSQL 

جزئیات Docker، Nginx و CI/CD هنگام مرحله Deployment مشخص می‌شوند.

۵. ساختار پروژه (Project Structure)

madaryar/ ├── prisma/ │ └── schema.prisma │ ├── public/ │ ├── fonts/ │ └── icons/ │ ├── src/ │ ├── app/ │ │ ├── (auth)/ │ │ │ ├── login/ │ │ │ └── register/ │ │ │ │ │ ├── (app)/ │ │ │ ├── home/ │ │ │ ├── child/ │ │ │ └── self-care/ │ │ │ │ │ ├── layout.tsx │ │ └── page.tsx │ │ │ ├── components/ │ │ ├── ui/ │ │ ├── home/ │ │ ├── child/ │ │ └── self-care/ │ │ │ ├── lib/ │ │ ├── prisma.ts │ │ └── validators/ │ │ │ ├── content/ │ │ ├── concerns/ │ │ ├── nutrition/ │ │ ├── allergens/ │ │ └── self-care/ │ │ │ └── types/ │ ├── docs/ │ ├── vision.md │ ├── requirements.md │ ├── user-stories.md │ ├── data-model.md │ └── architecture.md │ ├── .env.example ├── package.json └── README.md 

ساختار APIها بر اساس User Stories و Data Model، پس از Setup پروژه ساخته می‌شود.

۶. لایه‌های معماری

┌─────────────────────────────────────┐ │ UI Layer (React Components) │ │ - Mobile-first, RTL, Tailwind │ ├─────────────────────────────────────┤ │ Page Layer (Next.js App Router) │ │ - Server Components + Client │ ├─────────────────────────────────────┤ │ Backend Layer (داخل Next.js) │ │ - منطق تجاری + اعتبارسنجی │ ├─────────────────────────────────────┤ │ Data Access Layer (Prisma) │ │ - ORM │ ├─────────────────────────────────────┤ │ Database (PostgreSQL) │ └─────────────────────────────────────┘ 

۷. احراز هویت (Authentication)

رویکرد MVP

مرحلهتوضیحروشSession-based Authenticationثبت‌نامایمیل + رمز عبورورودایمیل + رمز عبوررمز عبورهش با bcryptSessionمدیریت امن Sessionکتابخانههنگام Construction انتخاب می‌شودمحافظت مسیرهاMiddleware 

قواعد

هر کاربر فقط به داده‌های خودش دسترسی دارد.

داده‌های Child به User والد متصل است.

بازیابی رمز پیچیده در MVP لازم نیست.

ورود با Google یا شبکه‌های اجتماعی در MVP نیست.

۸. محتوا (Static Content)

محتوای آماده شامل Common Concerns، Nutrition، Allergens و Self-Care به‌صورت فایل‌های ساخت‌یافته در Repository نگهداری می‌شود.

src/content/ ├── concerns/ │ ├── fever.md │ ├── vomiting.md │ ├── stomachache.md │ ├── colic.md │ └── allergy.md │ ├── nutrition/ │ └── recipes/ │ ├── allergens/ │ └── common.json │ └── self-care/ ├── moment-for-yourself.md ├── under-pressure.md └── not-enough.md 

مزایا

بدون دیتابیس اضافی

قابل ویرایش با Git

سریع و ساده

۹. Mobile-First و RTL

موردتصمیمطراحیMobile-firstBreakpointsموبایل، سپس تبلت و دسکتاپNavigationBottom Navigation در موبایلجهت<html dir="rtl" lang="fa">فونتVazirmatnاعداد فارسیاختیاریتعامل لمسیدکمه‌های بزرگ و فاصله مناسب 

۱۰. مسیر آینده به Android

از ابتدا تصمیم‌هایی گرفته می‌شود که تبدیل به Android ساده باشد، اما در MVP پیاده‌سازی نمی‌شود.

موردتصمیمماهیت فعلیWeb AppPWAآماده‌سازی ساختاریWrapper آیندهCapacitor یا TWAخروجی آیندهAPK / AABمقصد انتشارکافه‌بازار + مایکتGoogle Playخارج از برنامه فعلی 

مسیر آینده

MadarYar Web App ↓ آماده برای PWA (ساختاری) ↓ Android Wrapper (Capacitor / TWA) ↓ APK ↓ کافه‌بازار + مایکت 

PWA در MVP فعال نمی‌شود. فقط ساختار محصول به‌گونه‌ای طراحی می‌شود که در آینده امکان PWA و سپس Android Wrapper وجود داشته باشد.

APK و انتشار نیز در MVP نیست.

۱۱. امنیت و حریم خصوصی

HTTPS اجباری در محیط Production

رمز عبور با bcrypt هش می‌شود.

Session به‌صورت امن مدیریت می‌شود.

Cookieهای حساس باید HttpOnly و با تنظیمات امنیتی مناسب باشند.

هر کاربر فقط به داده‌های خودش دسترسی دارد.

دسترسی به اطلاعات Child باید از طریق مالکیت User کنترل شود.

Queryهای دیتابیس از طریق Prisma انجام می‌شوند.

React و Next.js برای کاهش ریسک XSS استفاده می‌شوند.

تنظیمات مناسب SameSite برای Cookieها در نظر گرفته می‌شود.

Backup دوره‌ای PostgreSQL انجام خواهد شد.

۱۲. مرز پزشکی در معماری

داده‌های Growth و Allergy فقط ذخیره و نمایش داده می‌شوند.

هیچ منطق تشخیص پزشکی در کد وجود ندارد.

هیچ توصیه دارویی تولید نمی‌شود.

هیچ دوز دارویی محاسبه یا پیشنهاد نمی‌شود.

محتوای آموزشی ثابت است.

در بخش‌های حساس، Disclaimer مناسب در UI نمایش داده می‌شود.

۱۳. خارج از معماری MVP

موارد زیر در معماری MVP پیاده‌سازی نمی‌شوند:

AI / Chatbot

تحلیل تصویر

Payment / Subscription

Google Play

APK

PWA فعال

اعلان‌های Push پیچیده

شبکه اجتماعی

Microservices

۱۴. جمع‌بندی

معماری مادریار برای MVP:

یک Web App ساده، Mobile-first، فارسی و RTL، با Next.js + TypeScript + Prisma + PostgreSQL، میزبانی‌شده روی VPS ایران، با حساب کاربری و ساختاری آماده برای تبدیل به Android در مرحله انتشار.

تصمیمات قطعی

✅ Web App ✅ Mobile-first ✅ فارسی / RTL ✅ Next.js + TypeScript ✅ Backend داخل Next.js ✅ PostgreSQL ✅ Prisma ✅ Session-based Authentication ✅ حساب کاربری ✅ VPS ایران ✅ آماده برای PWA (ساختاری) ✅ قابلیت تبدیل به Android در آینده ❌ Google Play فعلاً ❌ APK در MVP ❌ PWA فعال در MVP ❌ AI ❌ Payment ❌ Chatbot 

تصمیمات باز

🟡 نسخه دقیق Next.js 🟡 کتابخانه Authentication 🟡 جزئیات Docker / Nginx / CI-CD 🟡 ساخت APIها پس از Setup 

۱۵. گام بعدی

پس از تأیید و Commit این سند، مسیر توسعه به این ترتیب خواهد بود:

Task Breakdown — تقسیم User Stories به تسک‌های فنی

Setup پروژه — راه‌اندازی ساختار پایه

ساخت APIها بر اساس User Stories و Data Model

ساخت schema.prisma

Wireframe و طراحی صفحات

هدف این ترتیب آن است که قبل از شروع کدنویسی اصلی، مسیر ساخت محصول کاملاً مشخص باشد.

