Data Model — مادر‌یار

1. هدف

این سند ساختار داده‌های مورد نیاز برای MVP مادر‌یار و ارتباط بین آن‌ها را مشخص می‌کند.

هدف این است که داده‌ها ساده، قابل فهم و قابل توسعه باشند و از ایجاد ساختار پیچیده غیرضروری جلوگیری شود.

2. موجودیت‌های اصلی

در MVP موجودیت‌های اصلی عبارت‌اند از:

User

Child

Task

InventoryItem

GrowthRecord

Vaccination

Allergy

محتوای آموزشی و حمایتی MVP به‌صورت محتوای آماده در سیستم نگهداری می‌شود و لزوماً داده شخصی کاربر نیست.

3. User

نماینده حساب مادر در سیستم است.

Fields

id

name

email

passwordHash

createdAt

Relationships

هر User می‌تواند داشته باشد:

چند Child

چند Task

چند InventoryItem

4. Child

نماینده یک کودک متعلق به یک مادر است.

Fields

id

userId

name

birthDate

createdAt

Relationships

هر Child متعلق به یک User است و می‌تواند داشته باشد:

چند GrowthRecord

چند Vaccination

چند Allergy

Relationship:

User 1 ──── N Child 

5. Task

برای ثبت کارهای روزمره مادر یا خانه استفاده می‌شود.

Fields

id

userId

title

isCompleted

createdAt

Rules

هر Task متعلق به یک User است.

Task در MVP فقط یک‌بار انجام می‌شود.

Task تکرارشونده در MVP وجود ندارد.

کار می‌تواند انجام‌شده یا انجام‌نشده باشد.

کار امکان حذف دارد.

Relationship:

User 1 ──── N Task 

6. InventoryItem

برای ثبت اقلام ضروری خانه استفاده می‌شود.

Fields

id

userId

name

quantity

createdAt

updatedAt

Rules

هر InventoryItem متعلق به یک User است.

مقدار موجودی به‌صورت عدد ذخیره می‌شود.

وقتی quantity به 1 برسد، وضعیت کالا «کم» نمایش داده می‌شود.

مقدار 0 نیز به معنی تمام‌شدن کالا است.

کاربر می‌تواند مقدار موجودی را تغییر دهد.

کاربر می‌تواند کالا را حذف کند.

Relationship:

User 1 ──── N InventoryItem 

7. GrowthRecord

برای ثبت قد و وزن کودک استفاده می‌شود.

Fields

id

childId

date

height

weight

Rules

هر GrowthRecord متعلق به یک Child است.

هر کودک می‌تواند چند رکورد رشد داشته باشد.

رکوردها بر اساس تاریخ قابل نمایش هستند.

در MVP فقط سابقه و روند داده‌ها نمایش داده می‌شود.

سیستم در MVP تفسیر یا تشخیص پزشکی انجام نمی‌دهد.

Relationship:

Child 1 ──── N GrowthRecord 

8. Vaccination

برای ثبت وضعیت واکسن‌های کودک استفاده می‌شود.

Fields

id

childId

name

date

status

reminderDate

Rules

هر Vaccination متعلق به یک Child است.

هر کودک می‌تواند چند واکسن داشته باشد.

وضعیت واکسن ذخیره می‌شود.

تاریخ واکسن ذخیره می‌شود.

در صورت وجود تاریخ یادآوری، سیستم می‌تواند یادآوری مربوط به آن را نمایش دهد.

Relationship:

Child 1 ──── N Vaccination 

9. Allergy

برای ثبت واکنش غذایی مشاهده‌شده توسط مادر استفاده می‌شود.

Fields

id

childId

food

date

note

Rules

هر Allergy متعلق به یک Child است.

هر کودک می‌تواند چند مورد ثبت‌شده داشته باشد.

اطلاعات ثبت‌شده توسط مادر نباید به‌عنوان تشخیص پزشکی نمایش داده شود.

Relationship:

Child 1 ──── N Allergy 

10. Static Content

بعضی محتواهای MVP اطلاعات شخصی کاربر نیستند و به‌صورت محتوای آماده در سیستم قرار می‌گیرند.

شامل:

Common Concerns

تب

استفراغ

دل‌درد

کولیک

آلرژی

Food & Nutrition

غذاهای مناسب

دستورهای ساده

Food Allergens

اطلاعات عمومی درباره آلرژن‌های رایج غذایی در کودکان زیر یک سال

Mother Self-Care

برای لحظه‌ای بیشتر پیش خودت

برای وقت‌هایی که فشار زندگی روت زیاده

برای وقت‌هایی که فکر می‌کنی مادر کافی نیستی

این محتوا در MVP به‌صورت محتوای آماده است و کاربر آن را ایجاد یا ویرایش نمی‌کند.

11. Relationships Overview

ساختار اصلی داده‌ها:

User │ ├──< Task │ ├──< InventoryItem │ └──< Child │ ├──< GrowthRecord ├──< Vaccination └──< Allergy 

علامت < به معنی رابطه یک‌به‌چند است.

12. Data Ownership

داده‌های شخصی باید به User مربوط باشند.

User باید فقط به داده‌های خودش و کودکان متعلق به خودش دسترسی داشته باشد.

برای مثال:

User A ├── Child A ├── Child B ├── Task A └── Inventory A User B ├── Child C ├── Task B └── Inventory B 

User A نباید بتواند اطلاعات User B را مشاهده یا تغییر دهد.

13. Medical Data Boundary

داده‌های رشد و آلرژی صرفاً برای ثبت و نمایش اطلاعات واردشده توسط کاربر هستند.

MVP نباید بر اساس این داده‌ها:

بیماری تشخیص دهد

وضعیت پزشکی را تفسیر کند

دارو پیشنهاد کند

دوز دارو تعیین کند

14. Future Extensibility

ساختار داده باید امکان توسعه در آینده را حفظ کند، اما برای قابلیت‌هایی که در MVP وجود ندارند، مدل پیچیده ایجاد نمی‌شود.

قابلیت‌هایی مانند:

AI

Chatbot

Subscription

Payment

در مدل فعلی پیاده‌سازی نمی‌شوند.

