# Data Model — مادریار

## 1. هدف

ساختار داده‌ها برای MVP مادریار با Supabase (PostgreSQL).

اصول: ساده، قابل فهم، قابل توسعه.

---

## 2. موجودیت‌های اصلی

مادریار 6 موجودیت اصلی دارد:

- User (کاربر مادر)
- Child (کودک)
- GrowthRecord (اندازه‌گیری قد و وزن)
- Vaccination (وضعیت واکسن)
- UserChecklist (وضعیت چک‌لیست)
- UserStats (آمار کاربر برای چرخش محتوا)

---

## 3. User — کاربر

نماینده حساب مادر در سیستم.

### فیلدها

| فیلد | نوع | توضیح |
|------|-----|-------|
| id | UUID | شناسه یکتا |
| email | String | ایمیل |
| name | String | نام مادر |
| createdAt | DateTime | تاریخ ایجاد |

### نکته

مدیریت رمز عبور و احراز هویت توسط Supabase Auth انجام می‌شود.

### روابط

- User به Child: یک به چند
- User به UserChecklist: یک به چند
- User به UserStats: یک به یک

---

## 4. Child — کودک

نماینده یک کودک متعلق به یک مادر.

### فیلدها

| فیلد | نوع | توضیح |
|------|-----|-------|
| id | UUID | شناسه یکتا |
| userId | UUID | کلید خارجی به User |
| name | String | نام کودک |
| birthDate | Date | تاریخ تولد |
| gender | String | male یا female |
| createdAt | DateTime | تاریخ ایجاد |

### روابط

- Child به GrowthRecord: یک به چند
- Child به Vaccination: یک به چند

---

## 5. GrowthRecord — اندازه‌گیری قد و وزن

برای ثبت قد و وزن کودک.

### فیلدها

| فیلد | نوع | توضیح |
|------|-----|-------|
| id | UUID | شناسه یکتا |
| childId | UUID | کلید خارجی به Child |
| date | Date | تاریخ اندازه‌گیری |
| height | Float | قد به سانتی‌متر |
| weight | Float | وزن به کیلوگرم |

### قواعد

- هر رکورد متعلق به یک Child است
- نمایش لیست تاریخچه
- نمایش نمودار خطی ساده (بدون WHO)

---

## 6. Vaccination — واکسن

برای ثبت وضعیت واکسن‌های کودک.

### فیلدها

| فیلد | نوع | توضیح |
|------|-----|-------|
| id | UUID | شناسه یکتا |
| childId | UUID | کلید خارجی به Child |
| name | String | نام واکسن |
| ageMonths | Integer | سن به ماه |
| status | String | done یا pending |
| doneDate | Date | تاریخ انجام |

### قواعد

- 6 واکسن ثابت طبق برنامه کشوری
- وضعیت ذخیره می‌شود
- تاریخ انجام قابل ویرایش

---

## 7. UserChecklist — چک‌لیست کاربر

برای ذخیره وضعیت چک‌لیست‌های خانه.

### فیلدها

| فیلد | نوع | توضیح |
|------|-----|-------|
| id | UUID | شناسه یکتا |
| userId | UUID | کلید خارجی به User |
| listId | String | شناسه چک‌لیست |
| period | String | daily یا weekly یا monthly |
| items | JSON | وضعیت آیتم‌ها |
| lastReset | DateTime | آخرین ریست |

### قواعد

- ریست خودکار بر اساس period
- daily: هر شب
- weekly: هر شنبه
- monthly: اول ماه

---

## 8. UserStats — آمار کاربر

برای چرخش محتوا و آمار کاربر.

### فیلدها

| فیلد | نوع | توضیح |
|------|-----|-------|
| id | UUID | شناسه یکتا |
| userId | UUID | کلید خارجی به User |
| lastGiftIndex | Integer | آخرین پیام جعبه هدیه |
| lastChallengeIndex | Integer | آخرین چالش |
| lastRecipeIndex | Integer | آخرین غذا |
| lastGameIndex | Integer | آخرین بازی |
| lastTipIndex | Integer | آخرین نکته |
| challengesDone | JSON | چالش‌های انجام‌شده |

### قواعد

- برای جلوگیری از تکرار محتوا
- چرخش بر اساس تاریخ

---

## 9. محتوای ثابت

محتوای زیر در کد به صورت JSON ذخیره می‌شوند، نه در دیتابیس:

### ساختار پوشه‌ها
