// آیکون کتاب
export function IconBook({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* جلد کتاب */}
      <path
        d="M10 12 L32 16 L32 52 L10 48 Z"
        fill="#F9A8D4"
        stroke="#BE185D"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M54 12 L32 16 L32 52 L54 48 Z"
        fill="#FBCFE8"
        stroke="#BE185D"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* خطوط صفحه */}
      <line x1="16" y1="22" x2="26" y2="24" stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="28" x2="26" y2="30" stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="34" x2="26" y2="36" stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="24" x2="48" y2="22" stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="30" x2="48" y2="28" stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="38" y1="36" x2="48" y2="34" stroke="#BE185D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// آیکون پادکست
export function IconPodcast({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* میکروفون */}
      <rect x="26" y="10" width="12" height="24" rx="6" fill="#C4B5FD" stroke="#6D28D9" strokeWidth="2" />
      {/* قوس میکروفون */}
      <path
        d="M18 28 Q18 42 32 42 Q46 42 46 28"
        stroke="#6D28D9"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* پایه */}
      <line x1="32" y1="42" x2="32" y2="52" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="52" x2="40" y2="52" stroke="#6D28D9" strokeWidth="2" strokeLinecap="round" />
      {/* امواج صدا */}
      <path d="M12 24 Q10 28 12 32" stroke="#A78BFA" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M52 24 Q54 28 52 32" stroke="#A78BFA" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// آیکون فیلم
export function IconMovie({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      {/* قاب فیلم */}
      <rect x="8" y="14" width="48" height="36" rx="4" fill="#BAE6FD" stroke="#0369A1" strokeWidth="2" />
      {/* نوار بالا (سوراخ‌های فیلم) */}
      <rect x="8" y="14" width="48" height="8" fill="#0369A1" />
      <circle cx="14" cy="18" r="1.5" fill="#BAE6FD" />
      <circle cx="22" cy="18" r="1.5" fill="#BAE6FD" />
      <circle cx="30" cy="18" r="1.5" fill="#BAE6FD" />
      <circle cx="38" cy="18" r="1.5" fill="#BAE6FD" />
      <circle cx="46" cy="18" r="1.5" fill="#BAE6FD" />
      {/* دکمه پلی وسط */}
      <circle cx="32" cy="34" r="8" fill="#FFFFFF" stroke="#0369A1" strokeWidth="2" />
      <path d="M29 30 L29 38 L37 34 Z" fill="#0369A1" />
    </svg>
  );
}